"use client";
import {useEffect,useId,useRef,useState,type KeyboardEvent,type ReactNode} from 'react';
import {AlignLeft,BookOpen,DatabaseBackup,Languages,Palette,PanelLeft,WrapText,X} from 'lucide-react';
import {closeOnDialogBackdrop} from '../lib/overlay-interactions';
import {returnDialogFocus} from './dialog-focus';
import {useFuriganaPreference} from './furigana-preference';
import type {PresentationPreferences} from '../lib/presentation-preferences';
import './settings-help.css';

type Category='appearance'|'reading'|'language'|'workspace'|'data';
const categories=[
 {id:'appearance' as const,label:'Appearance',Icon:Palette},
 {id:'reading' as const,label:'Reading',Icon:BookOpen},
 {id:'language' as const,label:'Languages',Icon:Languages},
 {id:'workspace' as const,label:'Workspace',Icon:PanelLeft},
 {id:'data' as const,label:'Data',Icon:DatabaseBackup},
];
export function settingTabKey(event:Pick<KeyboardEvent,'key'|'preventDefault'>,current:Category):Category|undefined{
 if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
 event.preventDefault();
 if(event.key==='Home')return categories[0].id;
 if(event.key==='End')return categories[categories.length-1].id;
 const index=categories.findIndex(category=>category.id===current);
 return categories[(index+(event.key==='ArrowRight'||event.key==='ArrowDown'?1:-1)+categories.length)%categories.length].id;
}
export function PreferenceChoice<T extends string>({label,value,options,onChange}:{label:string;value:T;options:{value:T;label:string;sample?:ReactNode}[];onChange:(value:T)=>void}){
 const name=useId();
 return <fieldset className="sh-choice"><legend>{label}</legend><div className="sh-choice-options">{options.map(option=><label key={option.value} className={value===option.value?'is-selected':''}><input type="radio" name={name} value={option.value} checked={value===option.value} onChange={()=>onChange(option.value)}/>{option.sample&&<span className="sh-choice-sample" aria-hidden="true">{option.sample}</span>}<span>{option.label}</span></label>)}</div></fieldset>;
}
export function ReadingSettingsPreview({value}:{value:PresentationPreferences}){
 return <section className="sh-reading-preview" aria-label="Article preview" data-size={value.size} data-width={value.width} data-spacing={value.spacing}><small>Preview</small><div><h3>Sample Article</h3><p>This sample uses your Article text size and spacing. The available panel width may limit the line length.</p><p><ruby>日本語<rt>にほんご</rt></ruby> · 中文 · English</p></div><code data-wrap={value.codeWrap}>print("A code example uses your wrapping preference")</code></section>;
}
export default function PresentationSettings({value,onChange,onClose,error,layoutControls}:{layoutControls?:ReactNode;value:PresentationPreferences;onChange:(value:PresentationPreferences)=>void;onClose:()=>void;error?:string}){
 const dialog=useRef<HTMLDialogElement>(null),tabs=useRef<HTMLDivElement>(null),id=useId(),[category,setCategory]=useState<Category>('appearance'),[feedback,setFeedback]=useState(''),[vertical,setVertical]=useState(true);
 const {enabled:furiganaEnabled,setVisible:setFuriganaVisible}=useFuriganaPreference();
 useEffect(()=>{const media=window.matchMedia('(max-width:640px)'),update=()=>setVertical(!media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 useEffect(()=>{const previous=document.activeElement instanceof HTMLElement?document.activeElement:null,node=dialog.current;if(node&&!node.open)node.showModal();return()=>{node?.close();queueMicrotask(()=>{if(!document.querySelector('dialog[open]'))returnDialogFocus(previous);});}},[]);
 useEffect(()=>{if(!feedback)return;const timer=setTimeout(()=>setFeedback(''),3500);return()=>clearTimeout(timer);},[feedback,value]);
 function change(next:PresentationPreferences){onChange(next);setFeedback('Preferences updated on this device');}
 const tabKey=(event:KeyboardEvent<HTMLButtonElement>)=>{
  if(vertical&&['ArrowLeft','ArrowRight'].includes(event.key)||!vertical&&['ArrowUp','ArrowDown'].includes(event.key))return;
  const next=settingTabKey(event,category);
  if(next){setCategory(next);tabs.current?.querySelector<HTMLButtonElement>('[data-category="'+next+'"]')?.focus();}
 };
 return <dialog ref={dialog} className="v2-dialog wp-settings sh-settings" data-overlay-origin="top-right" onClick={event=>closeOnDialogBackdrop(event,onClose)} aria-labelledby={id+'-title'} onCancel={event=>{event.preventDefault();onClose();}}>
  <header className="v2-dialog-header sh-dialog-header"><h2 id={id+'-title'}>Settings</h2><button type="button" className="v2-icon" aria-label="Close settings" onClick={onClose}><X size={20}/></button></header>
  <div className="sh-settings-shell">
   <div ref={tabs} className="sh-category-tabs" role="tablist" aria-orientation={vertical?'vertical':'horizontal'} aria-label="Settings categories">{categories.map(({id:tab,label,Icon})=><button key={tab} type="button" role="tab" id={id+'-'+tab+'-tab'} aria-controls={category===tab?id+'-'+tab+'-panel':undefined} aria-selected={category===tab} tabIndex={category===tab?0:-1} data-category={tab} onClick={()=>setCategory(tab)} onKeyDown={tabKey}><Icon size={19}/><span>{label}</span></button>)}</div>
   <section key={category} className="sh-settings-panel sh-enter" role="tabpanel" id={id+'-'+category+'-panel'} aria-labelledby={id+'-'+category+'-tab'}>
    {category==='appearance'&&<>
     <h3 className="sh-panel-title">Appearance</h3>
     <PreferenceChoice label="Colour theme" value={value.theme} options={[{value:'dark',label:'Charcoal'},{value:'light',label:'Light'},{value:'system',label:'Follow device'}]} onChange={theme=>change({...value,theme})}/>
     <PreferenceChoice label="Interface density" value={value.density} options={[{value:'comfortable',label:'Comfortable'},{value:'compact',label:'Compact'}]} onChange={density=>change({...value,density})}/>
     <div className="sh-appearance-preview" aria-label="Appearance preview" data-density={value.density}><span>Example card</span><strong>Continue learning</strong><p>Spacing adjusts in navigation and overview cards without shrinking your writing editor.</p></div>
    </>}
    {category==='reading'&&<>
     <h3 className="sh-panel-title">Reading</h3>
     <PreferenceChoice label="Text size" value={value.size} options={[{value:'standard',label:'Standard',sample:<span className="sh-type-standard">Aa</span>},{value:'larger',label:'Larger',sample:<span className="sh-type-larger">Aa</span>},{value:'largest',label:'Largest',sample:<span className="sh-type-largest">Aa</span>}]} onChange={size=>change({...value,size})}/>
     <PreferenceChoice label="Article width" value={value.width} options={[{value:'comfortable',label:'Comfortable',sample:<AlignLeft size={20}/>},{value:'narrow',label:'Narrow',sample:<AlignLeft size={20} className="sh-narrow-lines"/>}]} onChange={width=>change({...value,width})}/>
     <PreferenceChoice label="Paragraph spacing" value={value.spacing} options={[{value:'comfortable',label:'Comfortable'},{value:'compact',label:'Compact'}]} onChange={spacing=>change({...value,spacing})}/>
     <label className="sh-switch-row"><WrapText size={20}/><span>Wrap code by default</span><input type="checkbox" role="switch" checked={value.codeWrap} onChange={event=>change({...value,codeWrap:event.target.checked})}/></label>
     <ReadingSettingsPreview value={value}/>
    </>}
    {category==='language'&&<>
     <h3 className="sh-panel-title">Languages</h3>
     <PreferenceChoice label="Japanese furigana" value={furiganaEnabled?'show':'hide'} options={[{value:'show',label:'Show above kanji'},{value:'hide',label:'Hide'}]} onChange={next=>{setFuriganaVisible(next==='show');setFeedback('Japanese reading display updated');}}/>
     <p className="sh-setting-description">The 漢 control in the top bar changes the same preference while you read Japanese. It is hidden in other learning spaces.</p>
     <div className="sh-settings-note"><strong>Speech</strong><p>Japanese uses the verified Piper Plus voice. Play and turtle controls are available beside the relevant sentences; other languages use their supported local voices.</p></div>
    </>}
    {category==='workspace'&&<>
     <h3 className="sh-panel-title">Workspace</h3>
     <PreferenceChoice label="Desktop sidebar" value={value.sidebar} options={[{value:'open',label:'Expanded',sample:<PanelLeft size={20}/>},{value:'compact',label:'Compact',sample:<PanelLeft size={20} className="sh-compact-sidebar"/>}]} onChange={sidebar=>change({...value,sidebar})}/>
     <PreferenceChoice label="Motion" value={value.motion} options={[{value:'system',label:'Follow device preference'},{value:'reduce',label:'Reduce motion'}]} onChange={motion=>change({...value,motion})}/>
     <p className="sh-setting-description">Notes can be moved and resized from their own menu. Your current Notes layout is retained separately on this device.</p>
    </>}
    {category==='data'&&<>
     <h3 className="sh-panel-title">Data and recovery</h3>
     <p className="sh-setting-description">Appearance and reading settings are remembered in this browser. Your saved Projects, Library material and Notes are separate from these display choices.</p>
     {layoutControls??<p className="sh-setting-description">Data and recovery controls are available in the main workspace.</p>}
    </>}
   </section>
  </div>
  <footer className="sh-dialog-footer">{error?<p role="status" className="sh-settings-error">{error}</p>:<span className="sh-settings-saved" role="status">{feedback}</span>}<button type="button" className="v2-secondary" onClick={onClose}>Done</button></footer>
 </dialog>;
}
