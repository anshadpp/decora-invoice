'use strict';
/* DECORA V5.8: opt-in visual workspace. The Classic renderer is left unchanged. */
(()=>{
const $=id=>document.getElementById(id), design=()=>window.decoraDesign?.getWorking();
const clone=x=>JSON.parse(JSON.stringify(x));
let selected=null,history=[],future=[],timer=0,scale=1,locked=new Set(),previewing=false;
const selectors={logo:'.invoice-header>img',business:'.invoice-header h1',title:'.invoice-title',signature:'.invoice-footer .sign img:last-child'};
const keys={logo:['logoX','logoY'],business:['businessX','businessY'],title:['titleX','titleY'],signature:['signX','signY']};
const say=s=>{$('studioMessage').textContent=s};
function snapshot(){const t=design();if(!t)return;history.push(clone(t));if(history.length>50)history.shift();future=[]}
function restore(src){const t=design();if(!t||!src)return;for(const k of Object.keys(t))delete t[k];Object.assign(t,clone(src));window.decoraDesign.refreshFields();draw()}
function undo(){if(!history.length)return;future.push(clone(design()));restore(history.pop())}
function redo(){if(!future.length)return;history.push(clone(design()));restore(future.pop())}
function layout(){const device=$('studioDevice').value,phone=Number($('studioPhone').value),outer=$('studioCanvas').parentElement,available=Math.max(180,outer.clientWidth-24),view=device==='mobile'?phone:device==='desktop'?Math.min(900,available):Math.min(794,available);$('studioPhoneWrap').hidden=device!=='mobile';const pages=$('studioCanvas').querySelectorAll('.sheet');scale=Math.min(view/794,1);const height=[...pages].reduce((n,p)=>n+1123+16,0);const frame=$('studioDeviceFrame');frame.style.width=(794*scale)+'px';frame.style.height=(height*scale)+'px';$('studioCanvas').style.width='794px';$('studioCanvas').style.transform=`scale(${scale})`}
function renderSample(forceClassic=false){
 const t=design();if(!t)return;
 // Temporarily use the real invoice renderer in an offscreen, full-width A4 measuring container.
 // The active invoice state and preview DOM are restored immediately afterwards.
 const live=$('pages'),savedDesign=state.design,scroll=live.parentElement.scrollTop,oldId=live.id;
 const staging=document.createElement('div');staging.id='pages';staging.className='paper-wrap';staging.style.cssText='position:fixed;left:-20000px;top:0;width:794px;max-width:none;visibility:hidden;z-index:-1';
 live.id='studio-original-pages';document.body.append(staging);
 try{state.design=forceClassic?{mode:'classic'}:{mode:'custom',template:clone(t)};renderPreview();const copies=[...staging.querySelectorAll(':scope > .sheet')].map(p=>p.cloneNode(true));return copies}
 finally{state.design=savedDesign;staging.remove();live.id=oldId;live.parentElement.scrollTop=scroll;pageControls();window.mobilePreview?.()}
}
function draw(){const t=design();if(!t||previewing)return;const canvas=$('studioCanvas');let copies;try{copies=renderSample()}catch(e){say('Preview could not render: '+e.message);return}canvas.replaceChildren();const pageSel=$('studioPage'),previous=Number(pageSel.value)||0;pageSel.replaceChildren();copies.forEach((p,i)=>{p.style.cssText+=';margin:0!important;display:block!important;visibility:visible!important;transform:none!important;zoom:1!important';canvas.append(p);const opt=new Option('Page '+(i+1),String(i));pageSel.add(opt);const spacer=document.createElement('div');spacer.className='studio-page-break';canvas.append(spacer)});pageSel.value=String(Math.min(previous,copies.length-1));layout();decorateSelection();document.dispatchEvent(new CustomEvent('decora:studio-drawn'));say('Live preview updated · '+copies.length+' A4 page'+(copies.length===1?'':'s'))}
function decorateSelection(){const editable=$('studioMode').value==='design';const pages=[...$('studioCanvas').querySelectorAll('.sheet')];pages.forEach((page,i)=>{for(const [id,sel] of Object.entries(selectors)){if(id==='signature'&&i!==pages.length-1)continue;const node=page.querySelector(sel);if(node)attach(node,id)}page.querySelectorAll('.designer-extra-text').forEach((node,j)=>attach(node,'text:'+j))});function attach(node,id){node.classList.toggle('studio-draggable',editable);node.classList.toggle('studio-selected',selected===id&&editable);node.classList.toggle('studio-locked',locked.has(id));node.dataset.studioElement=id;if(editable)node.onpointerdown=e=>startDrag(e,node,id);else node.onpointerdown=null}}
function select(id){selected=id;const t=design();if(!t)return;const isText=id?.startsWith('text:');const x=isText?t.extraTexts?.[Number(id.split(':')[1])]:null;const fields=isText?null:keys[id];$('studioSelection').textContent=id||'Select an element on the invoice';$('studioX').value=isText?x?.x||0:fields?t[fields[0]]||0:0;$('studioY').value=isText?x?.y||0:fields?t[fields[1]]||0:0;$('studioText').value=isText?x?.text||'':'';$('studioText').disabled=!isText;$('studioDeleteText').disabled=!isText;decorateSelection()}
function applyXY(id,x,y){const t=design();if(!t)return;const a=keys[id];if(a){t[a[0]]=Math.round(x);t[a[1]]=Math.round(y)}else if(id?.startsWith('text:')){const o=t.extraTexts?.[Number(id.split(':')[1])];if(o){o.x=Math.max(0,Math.min(750,Math.round(x)));o.y=Math.max(0,Math.min(1080,Math.round(y)))}}}
function currentXY(id){const t=design();const a=keys[id];if(a)return [Number(t[a[0]])||0,Number(t[a[1]])||0];const o=t.extraTexts?.[Number(id.split(':')[1])];return [o?.x||0,o?.y||0]}
function startDrag(e,node,id){if(e.button!==0||locked.has(id)||$('studioMode').value!=='design')return;e.preventDefault();e.stopPropagation();select(id);snapshot();const [x,y]=currentXY(id),sx=e.clientX,sy=e.clientY;node.setPointerCapture(e.pointerId);node.onpointermove=ev=>{const nx=x+(ev.clientX-sx)/scale,ny=y+(ev.clientY-sy)/scale;applyXY(id,nx,ny);$('studioX').value=Math.round(nx);$('studioY').value=Math.round(ny);if(id.startsWith('text:')){node.style.left=Math.round(nx)+'px';node.style.top=Math.round(ny)+'px'}else{node.style.transform=`translate(${Math.round(nx)}px,${Math.round(ny)}px)`}};node.onpointerup=()=>{node.onpointermove=null;node.onpointerup=null;draw()};node.onpointercancel=()=>{node.onpointermove=null;node.onpointerup=null;draw()}}
function changePosition(){if(!selected)return;snapshot();applyXY(selected,Number($('studioX').value),Number($('studioY').value));draw()}
function syncFields(){clearTimeout(timer);timer=setTimeout(()=>{if(design())draw()},160)}
function init(){if(!$('studioSection'))return;
 const section=$('studioSection'),dialog=$('designerDialog');
 // Existing Settings remains the only entry point.
 const observer=new MutationObserver(()=>{const visible=!$('designerCustom').hidden;section.hidden=!visible;if(visible&&dialog.open)draw()});observer.observe($('designerCustom'),{attributes:true,attributeFilter:['hidden']});
 dialog.addEventListener('close',()=>{selected=null});dialog.addEventListener('click',e=>{if(e.target.closest('#studioSection summary'))setTimeout(draw,0)});
 $('designerDuplicate').addEventListener('click',()=>setTimeout(draw,0));$('designerTemplate').addEventListener('change',()=>setTimeout(draw,0));
 $('designerCustom').addEventListener('input',e=>{if(e.target.closest('.studio-section'))return;syncFields()});
 $('designerCustom').addEventListener('change',e=>{if(e.target.closest('.studio-section'))return;syncFields()});
 for(const id of ['studioDevice','studioPhone'])$(id).addEventListener('change',layout);
 $('studioMode').addEventListener('change',decorateSelection);$('studioPage').addEventListener('change',()=>{const pages=$('studioCanvas').querySelectorAll('.sheet');pages[Number($('studioPage').value)]?.scrollIntoView({block:'nearest',behavior:'smooth'})});
 $('studioUndo').onclick=undo;$('studioRedo').onclick=redo;$('studioRefresh').onclick=draw;
 $('studioX').onchange=changePosition;$('studioY').onchange=changePosition;
 $('studioText').onchange=()=>{if(!selected?.startsWith('text:'))return;snapshot();design().extraTexts[Number(selected.split(':')[1])].text=$('studioText').value;draw()};
 $('studioAddText').onclick=()=>{snapshot();const t=design();t.extraTexts??=[];t.extraTexts.push({text:'Custom text',x:40,y:220,size:16});select('text:'+(t.extraTexts.length-1));draw()};
 $('studioDeleteText').onclick=()=>{if(!selected?.startsWith('text:'))return;snapshot();design().extraTexts.splice(Number(selected.split(':')[1]),1);selected=null;draw()};
 $('studioLock').onclick=()=>{if(!selected)return;if(locked.has(selected))locked.delete(selected);else locked.add(selected);decorateSelection()};
 $('studioApply').onclick=()=>{window.decoraDesign.apply();say('Applied to this invoice. Classic template is unchanged.')};
 $('studioCompare').onclick=()=>{let copies;try{copies=renderSample(true)}catch(e){say('Classic comparison failed: '+e.message);return}const overlay=document.createElement('div');overlay.className='studio-classic-overlay';const b=document.createElement('button');b.textContent='Close Classic comparison';b.onclick=()=>overlay.remove();overlay.append(b);const note=document.createElement('p');note.textContent='Original Classic DECORA invoice (read-only). Close to return to your custom design.';overlay.append(note);const content=document.createElement('div');content.style.cssText='transform-origin:top left;transform:scale('+scale+');width:794px';copies.forEach(p=>content.append(p));overlay.append(content);$('studioDeviceFrame').append(overlay);say('Classic comparison shown. Custom template unchanged.')};
 window.addEventListener('resize',()=>{if(!section.hidden)layout()});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
