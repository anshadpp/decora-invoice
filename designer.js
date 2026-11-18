'use strict';
/* DECORA V5.7: opt-in presentation layer. Classic path is never modified. */
(()=>{
const $=id=>document.getElementById(id);
const libraryKey='decora-custom-designs-v1';
const standards=[['serial','#'],['description','Particulars'],['qty','Qty/Days'],['rate','Rate'],['gst','GST%'],['amount','TOTAL']];
const clone=o=>JSON.parse(JSON.stringify(o));
const fresh=()=>({id:'custom-'+crypto.randomUUID(),name:'My Custom Design',business:'DECORA',address:'Arakkuparamba PO, Karinkallathani,\nMalappuramDist, 679341',contact:'',logo:'',signature:'',logoAlign:'right',signAlign:'center',logoSize:108,signSize:145,logoX:0,logoY:0,signX:0,signY:0,addressX:0,addressY:0,termsX:0,termsY:0,color:'#222222',font:'inherit',fontSize:18,titleX:0,titleY:0,businessX:0,businessY:0,extraTexts:[],tableLayout:{x:0,y:0,width:100,rowPadding:0},columns:standards.map(([id,label])=>({id,label,visible:true}))});
let library=load(),working=null;
function load(){try{const x=JSON.parse(localStorage.getItem(libraryKey));return Array.isArray(x)?x:[]}catch{return []}}
function saveLibrary(){try{localStorage.setItem(libraryKey,JSON.stringify(library));return true}catch{status('Could not save templates. Browser storage may be full; reduce image sizes or export a backup.');return false}}
function status(t){$('designerStatus').textContent=t}
function active(s){return s?.design?.mode==='custom'&&s.design.template? s.design.template:null}
function cols(s){return active(s)?.columns||standards.map(([id,label])=>({id,label,visible:true}))}
function columnCount(s){return active(s)?cols(s).length:6}
function decoratePage(page,s){const t=active(s);if(!t)return;page.classList.add('custom-design-page');page.style.setProperty('--custom-color',t.color||'#222');page.style.setProperty('--custom-font',t.font||'inherit');page.style.setProperty('--custom-size',(t.fontSize||18)+'px');const head=page.querySelector('.invoice-header');const title=head.querySelector('h1'),address=head.querySelector('h1+div'),logo=head.querySelector('img');title.textContent=t.business||'DECORA';title.style.transform=`translate(${t.businessX||0}px,${t.businessY||0}px)`;address.textContent=[t.address||'',t.contact||''].filter(Boolean).join('\n');address.style.whiteSpace='pre-line';address.style.transform=`translate(${t.addressX||0}px,${t.addressY||0}px)`;if(t.elementWidths?.address)address.style.width=t.elementWidths.address+'px';if(t.elementWidths?.business)title.style.width=t.elementWidths.business+'px';if(t.logo)logo.src=t.logo;logo.style.width=(t.logoSize||108)+'px';logo.style.height='auto';logo.style.maxHeight='135px';logo.style.objectFit='contain';logo.style.transform=`translate(${t.logoX||0}px,${t.logoY||0}px)`;if(t.logoAlign==='left'){head.style.flexDirection='row-reverse'}else if(t.logoAlign==='center'){head.style.flexDirection='column-reverse';head.style.alignItems='center';head.style.textAlign='center'}const invoiceTitle=page.querySelector('.invoice-title');invoiceTitle.style.transform=`translate(${t.titleX||0}px,${t.titleY||0}px)`;if(t.elementWidths?.title)invoiceTitle.style.width=t.elementWidths.title+'px';for(const x of t.extraTexts||[]){const note=document.createElement('div');note.className='designer-extra-text';note.textContent=x.text||'';note.style.left=(x.x||0)+'px';note.style.top=(x.y||0)+'px';note.style.fontSize=(x.size||16)+'px';note.style.width=(x.width||300)+'px';note.style.maxWidth='calc(100% - 20px)';note.style.whiteSpace='pre-wrap';note.style.overflowWrap='anywhere';note.style.textAlign=x.align||'left';note.style.color=t.color||'#222';page.append(note)}const table=page.querySelector('.page-table'),tr=table.tHead.rows[0];const original=[...tr.children];tr.replaceChildren();for(const c of cols(s)){let th;const idx=standards.findIndex(x=>x[0]===c.id);if(idx>=0)th=original[idx];else th=document.createElement('th');th.textContent=c.label||c.id;th.dataset.column=c.id;th.style.display=c.visible===false?'none':'';tr.append(th)}applyTableLayout(table,t);const visible=cols(s).filter(c=>c.visible!==false).length;table.style.setProperty('--column-count',visible);}
function applyTableLayout(table,t){
 const v=t.tableLayout||{};
 const width=Math.max(45,Math.min(100,Number(v.width)||100));
 const x=Math.max(0,Math.min(100-width,Number(v.x)||0));
 const y=Math.max(0,Math.min(130,Number(v.y)||0));
 table.style.width=width+'%';table.style.marginLeft=x+'%';table.style.marginTop=y+'px';
 table.style.tableLayout='fixed';
 const visible=(t.columns||[]).filter(c=>c.visible!==false);
 const weights=visible.map(c=>Math.max(5,Number(c.width)||100/Math.max(1,visible.length)));
 const sum=weights.reduce((a,b)=>a+b,0)||1;
 for(const [i,c] of visible.entries()){
  const th=table.querySelector('thead th[data-column="'+CSS.escape(c.id)+'"]');
  if(th){th.style.width=(weights[i]/sum*100)+'%';th.style.minWidth='0';}
 }
 table.style.setProperty('--custom-row-pad',Math.max(0,Math.min(14,Number(v.rowPadding)||0))+'px');
}
function decorateItemRow(row,item,s){const t=active(s);if(!t)return;const original=[...row.children];row.replaceChildren();for(const c of cols(s)){let cell;const idx=standards.findIndex(x=>x[0]===c.id);if(idx>=0)cell=original[idx];else{cell=document.createElement('td');cell.textContent=item.customFields?.[c.id]||'—'}cell.dataset.column=c.id;cell.style.display=c.visible===false?'none':'';row.append(cell)}}
function decorateSignature(sign,s){const t=active(s);if(!t)return;const images=sign.querySelectorAll('img');if(t.logo)images[0].src=t.logo;if(t.signature)images[1].src=t.signature;images[0].style.width=Math.min(108,t.logoSize||108)+'px';images[1].style.width=(t.signSize||145)+'px';images[1].style.height='auto';images[1].style.maxHeight='95px';images[1].style.transform=`translate(${t.signX||0}px,${t.signY||0}px)`;const termsBlock=sign.closest('.invoice-footer')?.querySelector('ul');if(termsBlock){termsBlock.style.transform=`translate(${t.termsX||0}px,${t.termsY||0}px)`;if(t.elementWidths?.terms)termsBlock.style.width=t.elementWidths.terms+'px'}sign.style.alignItems=t.signAlign==='left'?'flex-start':t.signAlign==='right'?'flex-end':'center'}
function populate(){renderGallery();const sel=$('designerTemplate');sel.replaceChildren();sel.add(new Option('Classic DECORA (protected)','classic'));library.forEach(t=>sel.add(new Option(t.name,t.id)));const current=active(state);if(current&&!library.some(x=>x.id===current.id))sel.add(new Option(current.name+' (invoice snapshot)','snapshot'));sel.value=current?(library.some(x=>x.id===current.id)?current.id:'snapshot'):'classic';$('designerCustom').hidden=!current;$('designerClassicNote').hidden=!!current;working=current?clone(current):null;if(working)populateFields()}
function populateFields(){const t=working;if(!t)return;for(const [element,key] of [['designBusiness','business'],['designAddress','address'],['designContact','contact'],['designLogoAlign','logoAlign'],['designSignAlign','signAlign'],['designLogoSize','logoSize'],['designSignSize','signSize'],['designLogoX','logoX'],['designLogoY','logoY'],['designSignX','signX'],['designSignY','signY'],['designColor','color'],['designFont','font'],['designFontSize','fontSize']])$(element).value=t[key]??'';renderColumns()}
function renderColumns(){const root=$('designerColumns');root.replaceChildren();working.columns.forEach((c,i)=>{const row=document.createElement('div');row.className='designer-column-row';const label=document.createElement('input');label.value=c.label;label.setAttribute('aria-label','Column label');label.oninput=()=>c.label=label.value;const show=document.createElement('label');show.textContent='Show ';const checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.checked=c.visible!==false;checkbox.onchange=()=>c.visible=checkbox.checked;show.append(checkbox);const left=document.createElement('button');left.textContent='←';left.disabled=i===0;left.onclick=()=>move(i,-1);const right=document.createElement('button');right.textContent='→';right.disabled=i===working.columns.length-1;right.onclick=()=>move(i,1);const remove=document.createElement('button');remove.textContent='×';remove.title='Remove custom column';remove.disabled=standards.some(x=>x[0]===c.id);remove.onclick=()=>{working.columns.splice(i,1);renderColumns()};row.append(label,show,left,right,remove);root.append(row)})}
function move(i,d){const a=working.columns;[a[i],a[i+d]]=[a[i+d],a[i]];renderColumns()}
function commit(){if(!working)return false;const previous=clone(state.design||{mode:'classic'});state.design={mode:'custom',template:clone(working)};if(!store(draftKey,state)){state.design=previous;status('Could not save invoice design. No changes were applied.');return false}renderPreview();status('Custom design applied to this invoice. Classic remains unchanged.');return true}
function open(){populate();$('designerDialog').showModal()}
function close(){$('designerDialog').close()}
function imageInput(input,key){input.addEventListener('change',async()=>{const file=input.files?.[0];if(!file)return;if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>1024*1024){status('Use PNG, JPG or WebP smaller than 1 MB.');input.value='';return}const reader=new FileReader();reader.onload=()=>{working[key]=reader.result;status('Image ready. Choose Save custom design to apply.');input.value=''};reader.readAsDataURL(file)})}
function customItemFields(){const t=active(state);if(!t)return;const custom=t.columns.filter(c=>!standards.some(x=>x[0]===c.id));if(!custom.length)return;document.querySelectorAll('#items>.item').forEach((card,i)=>{const item=state.items[i];if(!item)return;const details=document.createElement('details');details.className='designer-item-fields';const sum=document.createElement('summary');sum.textContent='Custom column values';details.append(sum);custom.forEach(c=>{const label=document.createElement('label');label.textContent=c.label;const inp=document.createElement('input');inp.value=item.customFields?.[c.id]||'';inp.addEventListener('input',()=>{item.customFields??={};item.customFields[c.id]=inp.value;store(draftKey,state);renderPreview()});label.append(inp);details.append(label)});card.append(details)})}
function saveTemplate(apply){
 if(!working)return;
 const copy=clone(working), old=library.slice(), index=library.findIndex(x=>x.id===copy.id);
 if(index>=0)library[index]=copy;else library.push(copy);
 if(!saveLibrary()){library=old;return}
 if(apply&&!commit()){library=old;saveLibrary();return}
 renderGallery();refreshSelector(copy.id);
 status('Template "'+copy.name+'" saved'+(apply?' and applied to this invoice.':' to My Templates.'));
}
function refreshSelector(preferred){
 const sel=$('designerTemplate');sel.replaceChildren();sel.add(new Option('Classic DECORA (protected)','classic'));
 library.forEach(t=>sel.add(new Option(t.name,t.id)));
 const current=active(state);
 if(current&&!library.some(x=>x.id===current.id))sel.add(new Option(current.name+' (invoice snapshot)','snapshot'));
 sel.value=preferred&&library.some(t=>t.id===preferred)?preferred:current?(library.some(t=>t.id===current.id)?current.id:'snapshot'):'classic';
}
function deleteTemplate(id){
 const target=library.find(t=>t.id===id);
 if(!target){status('This is an invoice-only design, not a saved template. Save it first to manage it in My Templates.');return}
 if(!confirm('Delete saved template "'+target.name+'"? Existing invoice snapshots will be preserved.'))return;
 const isActive=active(state)?.id===id;
 const switchClassic=isActive?confirm('Switch this invoice to Classic DECORA?\nOK = Switch to Classic\nCancel = Keep its current design snapshot'):false;
 const previous=library.slice();library=library.filter(t=>t.id!==id);
 if(!saveLibrary()){library=previous;return}
 if(isActive&&switchClassic){const oldDesign=clone(state.design);state.design={mode:'classic'};if(!store(draftKey,state)){state.design=oldDesign;library=previous;saveLibrary();status('Delete cancelled: could not update invoice.');return}renderPreview()}
 working=active(state)?clone(active(state)):null;
 $('designerCustom').hidden=!working;$('designerClassicNote').hidden=!!working;
 if(working)populateFields();
 refreshSelector();renderGallery();
 status('Template deleted from My Templates.'+(isActive?(switchClassic?' Current invoice switched to Classic.':' Current invoice keeps its design snapshot.') : ''));
}
function renderGallery(){
 const root=$('designerGallery');if(!root)return;root.replaceChildren();
 const classic=document.createElement('article');classic.className='template-card';
 const name=document.createElement('strong');name.textContent='Classic DECORA';
 const note=document.createElement('small');note.textContent='Protected original · Default';
 const classicActions=document.createElement('div');classicActions.className='template-card-actions';
 const use=document.createElement('button');use.type='button';use.textContent='Use Classic';use.onclick=()=>{$('designerReset').click()};
 classicActions.append(use);classic.append(name,note,classicActions);root.append(classic);
 library.forEach(t=>{
  const card=document.createElement('article');card.className='template-card';
  const preview=document.createElement('div');preview.className='template-card-preview';preview.style.borderTop='5px solid '+(/^#[0-9a-f]{6}$/i.test(t.color||'')?t.color:'#222');
  const title=document.createElement('strong');title.textContent=t.business||'Invoice';
  const line=document.createElement('span');line.textContent='INVOICE · Particulars · Amount';
  preview.append(title,line);
  const heading=document.createElement('strong');heading.textContent=t.name;
  const badge=document.createElement('small');badge.textContent=active(state)?.id===t.id?'Applied to current invoice':'Saved reusable template';
  const actions=document.createElement('div');actions.className='template-card-actions';
  const add=(label,fn,cls)=>{const b=document.createElement('button');b.type='button';b.textContent=label;if(cls)b.className=cls;b.onclick=fn;actions.append(b)};
  add('Use',()=>{working=clone(t);if(commit()){populate();status('Template "'+t.name+'" applied to this invoice.')}});
  add('Edit',()=>{working=clone(t);$('designerCustom').hidden=false;$('designerClassicNote').hidden=true;populateFields();refreshSelector(t.id);status('Editing "'+t.name+'". Save Template to keep changes.');$('designerCustom').scrollIntoView({block:'start',behavior:'smooth'})});
  add('Duplicate',()=>{working=clone(t);working.id='custom-'+crypto.randomUUID();const input=prompt('Name your template copy',t.name+' Copy');if(input===null)return;working.name=input.trim()||t.name+' Copy';$('designerCustom').hidden=false;$('designerClassicNote').hidden=true;populateFields();status('Unsaved duplicate created. Select Save Template to add it to My Templates.')});
  add('Rename',()=>{const input=prompt('Rename template',t.name);if(input===null||!input.trim())return;const previous=library.slice();library=library.map(x=>x.id===t.id?{...x,name:input.trim()}:x);if(!saveLibrary()){library=previous;return}if(working?.id===t.id)working.name=input.trim();refreshSelector();renderGallery();status('Template renamed.')});
  add('Delete',()=>deleteTemplate(t.id),'template-delete');
  card.append(preview,heading,badge,actions);root.append(card)
 });
}
function init(){if(!$('designerDialog'))return;document.querySelectorAll('#designSettingsTop,#designSettingsMobile').forEach(b=>b.addEventListener('click',open));$('designerClose').onclick=close;$('designerDialog').addEventListener('click',e=>{if(e.target===$('designerDialog'))close()});$('designerDuplicate').onclick=()=>{const from=working||fresh();working=clone(from);working.id='custom-'+crypto.randomUUID();working.name=prompt('Name your design',from.name==='My Custom Design'?'My Custom Design':from.name+' Copy')?.trim()||'My Custom Design';$('designerCustom').hidden=false;$('designerClassicNote').hidden=true;populateFields();status('Editable copy created. Classic is protected.')};$('designerReset').onclick=()=>{state.design={mode:'classic'};store(draftKey,state);renderPreview();populate();status('Classic DECORA restored for this invoice.')};$('designerTemplate').onchange=e=>{const val=e.target.value;if(val==='classic'){state.design={mode:'classic'};store(draftKey,state);renderPreview();populate();return}working=clone(val==='snapshot'?active(state):library.find(x=>x.id===val));if(!working)return;commit();populate()};for(const [element,key] of [['designBusiness','business'],['designAddress','address'],['designContact','contact'],['designLogoAlign','logoAlign'],['designSignAlign','signAlign'],['designLogoSize','logoSize'],['designSignSize','signSize'],['designLogoX','logoX'],['designLogoY','logoY'],['designSignX','signX'],['designSignY','signY'],['designColor','color'],['designFont','font'],['designFontSize','fontSize']])$(element).addEventListener('input',e=>{if(!working)return;working[key]=e.target.type==='range'?Number(e.target.value):e.target.value});imageInput($('designLogo'),'logo');imageInput($('designSign'),'signature');$('designRemoveLogo').onclick=()=>{working.logo='';status('Original logo selected; save to apply.')};$('designRemoveSign').onclick=()=>{working.signature='';status('Original signature selected; save to apply.')};$('designAddColumn').onclick=()=>{const input=$('designNewColumn'),name=input.value.trim();if(!name||!working)return;working.columns.push({id:'field-'+crypto.randomUUID(),label:name,visible:true});input.value='';renderColumns()};$('designerSave').onclick=()=>{if(commit()){renderEditor();customItemFields();renderGallery()}};
$('designerSaveTemplate').onclick=()=>saveTemplate(false);
$('designerSaveApply').onclick=()=>saveTemplate(true);
$('designerDeleteTemplate').onclick=()=>deleteTemplate(working?.id);const originalRenderEditor=renderEditor;window.renderEditor=function(){originalRenderEditor();customItemFields()};customItemFields()}
window.decoraDesign={decoratePage,decorateItemRow,decorateSignature,columnCount,init,getWorking:()=>working,refreshFields:populateFields,apply:commit};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
