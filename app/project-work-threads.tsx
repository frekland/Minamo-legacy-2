'use client';
import {Fragment,useEffect,useMemo,useState} from 'react';
import {ArrowUpRight,ChevronDown,GitBranch} from 'lucide-react';
import type {ArticleSection,WorkspaceRecord} from '../lib/contracts';
import type {WorkThread} from '../lib/project-composition';
import {generationFetch} from '../lib/workspace-generation';
import {RichReadingPart} from './reader';
import ProjectContributions from './project-contributions';
import './project-work-threads.css';

type Link=WorkThread['items'][number];
type OnOpen=(sectionId:string,partId:string)=>void;
type Part=ArticleSection['parts'][number];
const labels={working:'Working material',evidence:'Evidence and checks',decision:'Reasoning and decisions'} as const;

function adjacentObservations(section:ArticleSection|undefined,id:string){
 const parts=section?.parts??[],start=parts.findIndex(part=>part.id===id),items:Array<{note:Part;inputs?:Part}>=[];
 if(start<0)return items;
 for(let i=start+1;i<parts.length;){const part=parts[i];if(part.kind!=='callout'||part.callout?.label!=='Observation'||!/^observation-[a-f0-9]{32}$/.test(part.id))break;const inputs=parts[i+1]?.id===part.id+'-inputs'&&parts[i+1]?.kind==='code'?parts[i+1]:undefined;items.push({note:part,inputs});i+=inputs?2:1;}
 return items;
}

function RetainedPart({record,scope,link}:{record:WorkspaceRecord;scope:string;link:Link}){
 const [open,setOpen]=useState(false),[saved,setSaved]=useState<WorkspaceRecord|null>(null),[error,setError]=useState('');
 useEffect(()=>{if(!open||!link.revision)return;let live=true;queueMicrotask(()=>{if(live){setSaved(null);setError('');}});generationFetch(scope,'/api/projects/composition?'+new URLSearchParams({projectId:record.id,revision:String(link.revision)})).then(async response=>{const result=await response.json() as {record?:WorkspaceRecord;error?:string};if(!response.ok||!result.record)throw Error(result.error??'Saved revision unavailable.');return result.record;}).then(value=>{if(live)setSaved(value);}).catch(e=>{if(live)setError((e as Error).message);});return()=>{live=false;};},[open,link.revision,record.id,scope]);
 const source=link.revision?saved:record,part=source?.sections?.find(s=>s.id===link.sectionId)?.parts.find(p=>p.id===link.partId);
 return <details className="pwt-retained" open={open} onToggle={event=>setOpen(event.currentTarget.open)}><summary>Earlier material{link.revision?` · revision ${link.revision}`:''}<ChevronDown size={15}/></summary>{open&&(error?<p role="alert">{error}</p>:part&&source?<RichReadingPart part={part} sectionId={link.sectionId} article={source} captures={[]} ownerScope={scope}/>:<p>{link.revision&&!saved?'Loading exact saved material…':'This part is not available in that revision.'}</p>)}</details>;
}

function CurrentPart({record,scope,link}:{record:WorkspaceRecord;scope:string;link:Link}){
 const section=record.sections?.find(s=>s.id===link.sectionId),part=section?.parts.find(p=>p.id===link.partId),[expanded,setExpanded]=useState(false);
 if(link.unresolvedRef||!part)return <div className="pwt-unavailable" role="note"><strong>Original material unavailable</strong><p>{link.unresolvedRef?.reason==='identity-uncertain'?'The original part could not be matched safely.':'The referenced part is no longer present.'} Nothing has been substituted.</p>{link.unresolvedRef?.lastSeenRevision&&<RetainedPart record={record} scope={scope} link={{...link,revision:link.unresolvedRef.lastSeenRevision,unresolvedRef:undefined}}/>}</div>;
 const longCode=part.kind==='code'&&part.text.length>2500,saved=part.kind==='interactive'?adjacentObservations(section,part.id):[];
 const language=part.language??(part.semantic?.kind==='ruby'?part.semantic.language.language:part.interactive?.type==='language-dialogue'||part.interactive?.type==='language-reveal'||part.interactive?.type==='language-pattern'?part.interactive.language:undefined);
 const contributions:('code'|'table'|'dialogue')|null=part.kind==='table'&&part.table?'table':part.kind==='code'?'code':part.interactive?.type==='language-dialogue'?'dialogue':null;
 const columns=contributions==='table'?part.table!.headers:contributions==='code'?['Code variation','Observation']:['Your response','Translation / notes'];
 return <section className="pwt-part">{longCode?<details open={expanded} onToggle={event=>setExpanded(event.currentTarget.open)} className="pwt-long-source"><summary>Code source · {part.text.split('\n').length} lines <ChevronDown size={15}/></summary>{expanded&&<RichReadingPart part={part} sectionId={link.sectionId} article={record} captures={[]} ownerScope={scope}/>}</details>:<RichReadingPart part={part} sectionId={link.sectionId} article={record} captures={[]} ownerScope={scope}/>} {contributions&&<ProjectContributions key={record.id+':'+link.partId} target={{projectId:record.id,sectionId:link.sectionId,partId:link.partId}} kind={contributions} columns={columns} language={language} scope={scope} projectRev={record.rev}/>} {saved.length>0&&<details className="pwt-observations"><summary>Saved observations ({saved.length})</summary>{saved.map(({note,inputs})=><div key={note.id}><RichReadingPart part={note} sectionId={link.sectionId} article={record} captures={[]} ownerScope={scope}/>{inputs&&<details><summary>Captured inputs and output</summary><RichReadingPart part={inputs} sectionId={link.sectionId} article={record} captures={[]} ownerScope={scope}/></details>}</div>)}</details>}</section>;
}

function RecentChanges({record,scope}:{record:WorkspaceRecord;scope:string}){
 const [open,setOpen]=useState(false),[data,setData]=useState<Array<{revision:number;at:string;arrangementChanged:boolean;changes:Array<{sectionTitle:string}>}>|null>(null),[error,setError]=useState('');
 useEffect(()=>{if(!open)return;let live=true;queueMicrotask(()=>{if(live){setData(null);setError('');}});generationFetch(scope,'/api/projects/changes?'+new URLSearchParams({projectId:record.id,limit:'3'})).then(async response=>{const result=await response.json() as {revisions:NonNullable<typeof data>;error?:string};if(!response.ok)throw Error(result.error??'Could not read saved changes.');return result.revisions;}).then(value=>{if(live)setData(value);}).catch(e=>{if(live)setError((e as Error).message);});return()=>{live=false;};},[open,record.id,record.rev,scope]);
 return <details className="pwt-changes" open={open} onToggle={event=>setOpen(event.currentTarget.open)}><summary>Recent saved changes <ChevronDown size={15}/></summary>{open&&(error?<p role="alert">{error}</p>:data?<ol>{data.map(row=><li key={row.revision}><strong>Revision {row.revision}</strong> · {new Date(row.at).toLocaleDateString('en-GB')}<p>{[...new Set(row.changes.map(change=>change.sectionTitle))].slice(0,3).join(', ')||'Project organisation updated'}</p></li>)}</ol>:<p>Reading saved revisions…</p>)}</details>;
}

export default function ProjectWorkThreads({record,scope,threads,onOpen}:{record:WorkspaceRecord;scope:string;threads:WorkThread[];onOpen:OnOpen}){
 const key='minamo-work-thread:'+scope+':'+record.id,[selected,setSelected]=useState(threads[0]?.id??''),[showEarlier,setShowEarlier]=useState(false);
 useEffect(()=>{let live=true;queueMicrotask(()=>{if(!live)return;let id:string|null=null;try{id=new URLSearchParams(window.location.search).get('thread')??localStorage.getItem(key);}catch{}setSelected(id&&threads.some(thread=>thread.id===id)?id:threads[0]?.id??'');});return()=>{live=false;};},[key,threads]);
 const thread=threads.find(item=>item.id===selected)??threads[0],groups=useMemo(()=>thread?(['working','evidence','decision'] as const).map(role=>({role,items:thread.items.filter(item=>item.role===role&&item.revision===undefined)})).filter(group=>group.items.length):[],[thread]),older=thread?.items.filter(item=>item.role==='earlier'||item.revision!==undefined)??[];
 if(!thread)return null;
 function choose(id:string){setSelected(id);setShowEarlier(false);try{localStorage.setItem(key,id);}catch{}}
 return <div className={'pwt-workspace'+(threads.length===1?' pwt-single':'')}>{threads.length>1&&<nav className="pwt-list" aria-label="Project questions">{threads.map(item=><button key={item.id} type="button" aria-current={thread.id===item.id?'page':undefined} onClick={()=>choose(item.id)}><strong>{item.title}</strong></button>)}</nav>}<article className="pwt-article"><header><p className="pwt-kicker">QUESTION {threads.indexOf(thread)+1} OF {threads.length}</p><h2>{thread.title}</h2>{thread.question&&<p>{thread.question}</p>}{thread.summary&&<p className="pwt-summary">{thread.summary}</p>}<RecentChanges record={record} scope={scope}/></header>{groups.map(group=><section className="pwt-group" key={group.role}><h3>{labels[group.role]}</h3>{group.items.map((item,index)=><Fragment key={item.sectionId+':'+item.partId}>{(index===0||group.items[index-1]?.sectionId!==item.sectionId)&&<div className="pwt-part-source"><span>{record.sections?.find(section=>section.id===item.sectionId)?.title??'Project material'}</span><button type="button" onClick={()=>onOpen(item.sectionId,item.partId)}>Open section <ArrowUpRight size={13}/></button></div>}<CurrentPart record={record} scope={scope} link={item}/></Fragment>)}</section>)}{older.length>0&&<section className="pwt-earlier"><button type="button" aria-expanded={showEarlier} onClick={()=>setShowEarlier(!showEarlier)}><GitBranch size={16}/> Earlier approaches <span>{older.length}</span><ChevronDown size={16}/></button>{showEarlier&&<div>{older.map((item,i)=><RetainedPart key={item.partId+':'+i} record={record} scope={scope} link={item}/>)}</div>}</section>}{thread.unresolved&&<footer className="pwt-unresolved"><h3>Still unresolved</h3><p>{thread.unresolved}</p></footer>}</article></div>;
}
