import test from 'node:test';
import assert from 'node:assert/strict';
import {privateStorageFixture} from './private-storage-fixture.mjs';
import {isDomainPath,domainMethodAllowed} from '../lib/domain-routes.ts';

test('C3 route is registered in the production API dispatch allowlist',()=>{
 assert.equal(isDomainPath('/api/projects/changes'),true);
 assert.equal(domainMethodAllowed('/api/projects/changes','GET'),true);
 assert.equal(domainMethodAllowed('/api/projects/changes','POST'),false);
});

test('C3: owner-scoped exact Project changes, stable paging and historical readback',async()=>{
 const fixture=await privateStorageFixture("import {domainHandler} from './lib/domain-handler.ts';export default {fetch:domainHandler}");
 try{
  const person=fixture.client('c3-owner'),other=fixture.client('c3-other'),id='c3-revision-reading';
  const first=[{id:'a',title:'Grammar',parts:[{id:'example',kind:'paragraph',text:'仕事です。'}]}];
  const changed=[{id:'a',title:'Grammar',parts:[{id:'example',kind:'paragraph',text:'仕事が終わりました。'},{id:'added',kind:'paragraph',text:'New example.'}]}];
  assert.equal((await person.command({action:'create',family:'journey',id,data:{title:'Grammar v1',body:'',sections:first}})).status,200);
  assert.equal((await person.command({action:'update',family:'journey',id,expectedRev:1,data:{title:'Grammar v2',sections:changed}})).status,200);
  assert.equal((await person.command({action:'update',family:'journey',id,expectedRev:2,data:{projectDescription:'Revised summary'}})).status,200);
  const mcp=await person.request('/mcp',{jsonrpc:'2.0',id:'read-changes',method:'tools/call',params:{name:'read_project_changes',arguments:{purpose:'Inspect the learner’s real saved changes',projectId:id,limit:2}}});
  assert.equal(mcp.status,200,JSON.stringify(mcp.data));
  const page=mcp.data.result.structuredContent;
  assert.equal(page.currentProjectRev,3);assert.deepEqual(page.revisions.map(item=>item.revision),[3,2]);
  assert.equal(page.revisions[0].descriptionChanged,true);assert.equal(page.revisions[1].titleChanged,true);
  assert.ok(page.revisions[1].changes.some(change=>change.partId==='example'&&change.change==='revised'));
  assert.ok(page.revisions[1].changes.some(change=>change.partId==='added'&&change.change==='added'));
  assert.deepEqual(page.revisions[1].exactRead,{tool:'get_project_composition',projectId:id,revision:2});
  assert.equal(page.nextBeforeRevision,1);
  const oldest=await person.request('/api/projects/changes?'+new URLSearchParams({projectId:id,beforeRevision:'1',limit:'2'}));
  assert.equal(oldest.status,200);assert.deepEqual(oldest.data.revisions.map(item=>item.revision),[1]);assert.equal(oldest.data.nextBeforeRevision,null);
  const history=await person.request('/api/projects/composition?'+new URLSearchParams({projectId:id,revision:'2'}));
  assert.equal(history.status,200);assert.equal(history.data.record.sections[0].parts[0].text,'仕事が終わりました。');
  const denied=await other.request('/api/projects/changes?projectId='+id);assert.equal(denied.status,404);
  for(const suffix of ['&limit=0','&limit=21','&beforeRevision=99','&beforeRevision=0']){
   const bad=await person.request('/api/projects/changes?projectId='+id+suffix);assert.equal(bad.status,400,suffix);
  }
 }finally{await fixture.dispose();}
});
