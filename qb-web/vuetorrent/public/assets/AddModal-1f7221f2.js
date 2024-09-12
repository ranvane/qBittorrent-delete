import{a as D,m as w}from"./vue-b220ace6.js";import{_ as n,g as $,k as a,a as o,m as T,b as y,d as k,w as _,h as I,c as V,e as L,f as C,i as M,j as F,l as A,n as E,o as P,p as z,q as O,r as B,Q as N,s as W,t as j,V as R,u as q,v as K,x as c,y as d,z as H,A as p,B as m,C as r,D as U,E as G,F as Q}from"./index-ffe23009.js";import{F as Y}from"./FullScreenModal-b7264cb2.js";import{M as Z}from"./Modal-f5e0cc6c.js";import{C as f,S as g}from"./AppPreferences-9ee94fcd.js";import{_ as J}from"./VDialog-9fede875.js";import{_ as x}from"./VContainer-20657d24.js";import{_ as S}from"./VForm-68414474.js";import{_ as X}from"./VTextarea-f68dae76.js";import{_ as h}from"./VCheckbox-04f4914f.js";import"./index-44c9f94b.js";const v={...k,offsetY:!0,offsetOverflow:!0,transition:!1},u=n.extend({name:"v-autocomplete",props:{autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:(e,t,s)=>s.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())>-1},hideNoData:Boolean,menuProps:{type:n.options.props.menuProps.type,default:()=>v},noFilter:Boolean,searchInput:{type:String}},data(){return{lazySearch:this.searchInput}},computed:{classes(){return{...n.options.computed.classes.call(this),"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1}},computedItems(){return this.filteredItems},selectedValues(){return this.selectedItems.map(e=>this.getValue(e))},hasDisplayedItems(){return this.hideSelected?this.filteredItems.some(e=>!this.hasItem(e)):this.filteredItems.length>0},currentRange(){return this.selectedItem==null?0:String(this.getText(this.selectedItem)).length},filteredItems(){return!this.isSearching||this.noFilter||this.internalSearch==null?this.allItems:this.allItems.filter(e=>{const t=$(e,this.itemText),s=t!=null?String(t):"";return this.filter(e,String(this.internalSearch),s)})},internalSearch:{get(){return this.lazySearch},set(e){this.lazySearch!==e&&(this.lazySearch=e,this.$emit("update:search-input",e))}},isAnyValueAllowed(){return!1},isDirty(){return this.searchIsDirty||this.selectedItems.length>0},isSearching(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow(){return this.isFocused?this.hasDisplayedItems||!this.hideNoData:!1},$_menuProps(){const e=n.options.computed.$_menuProps.call(this);return e.contentClass=`v-autocomplete__content ${e.contentClass||""}`.trim(),{...v,...e}},searchIsDirty(){return this.internalSearch!=null&&this.internalSearch!==""},selectedItem(){return this.multiple?null:this.selectedItems.find(e=>this.valueComparator(this.getValue(e),this.getValue(this.internalValue)))},listData(){const e=n.options.computed.listData.call(this);return e.props={...e.props,items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch},e}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused(e){e?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.blur(),this.updateSelf())},isMenuActive(e){e||!this.hasSlot||(this.lazySearch=null)},items(e,t){!(t&&t.length)&&this.hideNoData&&this.isFocused&&!this.isMenuActive&&e.length&&this.activateMenu()},searchInput(e){this.lazySearch=e},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created(){this.setSearch()},destroyed(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged(e,t){if(e!==t){if(!this.autoSelectFirst){const s=t[this.$refs.menu.listIndex];s?this.setMenuIndex(e.findIndex(i=>i===s)):this.setMenuIndex(-1),this.$emit("update:list-index",this.$refs.menu.listIndex)}this.$nextTick(()=>{!this.internalSearch||e.length!==1&&!this.autoSelectFirst||(this.$refs.menu.getTiles(),this.autoSelectFirst&&e.length&&(this.setMenuIndex(0),this.$emit("update:list-index",this.$refs.menu.listIndex)))})}},onInternalSearchChanged(){this.updateMenuDimensions()},updateMenuDimensions(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex(e){this.searchIsDirty||(this.multiple&&e===a.left?this.selectedIndex===-1?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&e===a.right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:(e===a.backspace||e===a.delete)&&this.deleteCurrentItem())},deleteCurrentItem(){const e=this.selectedIndex,t=this.selectedItems[e];if(!this.isInteractive||this.getDisabled(t))return;const s=this.selectedItems.length-1;if(this.selectedIndex===-1&&s!==0){this.selectedIndex=s;return}const i=this.selectedItems.length,l=e!==i-1?e:e-1;this.selectedItems[l]?this.selectItem(t):this.setValue(this.multiple?[]:null),this.selectedIndex=l},clearableCallback(){this.internalSearch=null,n.options.methods.clearableCallback.call(this)},genInput(){const e=o.options.methods.genInput.call(this);return e.data=T(e.data,{attrs:{"aria-activedescendant":y(this.$refs.menu,"activeTile.id"),autocomplete:y(e.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),e},genInputSlot(){const e=n.options.methods.genInputSlot.call(this);return e.data.attrs.role="combobox",e},genSelections(){return this.hasSlot||this.multiple?n.options.methods.genSelections.call(this):[]},onClick(e){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(e.target)||this.activateMenu())},onInput(e){if(this.selectedIndex>-1||!e.target)return;const t=e.target,s=t.value;t.value&&this.activateMenu(),!this.multiple&&s===""&&this.deleteCurrentItem(),this.internalSearch=s,this.badInput=t.validity&&t.validity.badInput},onKeyDown(e){const t=e.keyCode;(e.ctrlKey||![a.home,a.end].includes(t))&&n.options.methods.onKeyDown.call(this,e),this.changeSelectedIndex(t)},onSpaceDown(e){},onTabDown(e){n.options.methods.onTabDown.call(this,e),this.updateSelf()},onUpDown(e){e.preventDefault(),this.activateMenu()},selectItem(e){n.options.methods.selectItem.call(this,e),this.setSearch()},setSelectedItems(){n.options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch(){this.$nextTick(()=>{(!this.multiple||!this.internalSearch||!this.isMenuActive)&&(this.internalSearch=!this.selectedItems.length||this.multiple||this.hasSlot?null:this.getText(this.selectedItem))})},updateSelf(){!this.searchIsDirty&&!this.internalValue||!this.multiple&&!this.valueComparator(this.internalSearch,this.getValue(this.internalValue))&&this.setSearch()},hasItem(e){return this.selectedValues.indexOf(this.getValue(e))>-1},onCopy(e){var t,s;if(this.selectedIndex===-1)return;const i=this.selectedItems[this.selectedIndex],l=this.getText(i);(t=e.clipboardData)===null||t===void 0||t.setData("text/plain",l),(s=e.clipboardData)===null||s===void 0||s.setData("text/vnd.vuetify.autocomplete.item+plain",l),e.preventDefault()}}}),b=u.extend({name:"v-combobox",props:{delimiters:{type:Array,default:()=>[]},returnObject:{type:Boolean,default:!0}},data:()=>({editingIndex:-1}),computed:{computedCounterValue(){return this.multiple?this.selectedItems.length:(this.internalSearch||"").toString().length},hasSlot(){return n.options.computed.hasSlot.call(this)||this.multiple},isAnyValueAllowed(){return!0},menuCanShow(){return this.isFocused?this.hasDisplayedItems||!!this.$slots["no-data"]&&!this.hideNoData:!1},searchIsDirty(){return this.internalSearch!=null}},methods:{onInternalSearchChanged(e){if(e&&this.multiple&&this.delimiters.length){const t=this.delimiters.find(s=>e.endsWith(s));t!=null&&(this.internalSearch=e.slice(0,e.length-t.length),this.updateTags())}this.updateMenuDimensions()},genInput(){const e=u.options.methods.genInput.call(this);return delete e.data.attrs.name,e.data.on.paste=this.onPaste,e},genChipSelection(e,t){const s=n.options.methods.genChipSelection.call(this,e,t);return this.multiple&&(s.componentOptions.listeners={...s.componentOptions.listeners,dblclick:()=>{this.editingIndex=t,this.internalSearch=this.getText(e),this.selectedIndex=-1}}),s},onChipInput(e){n.options.methods.onChipInput.call(this,e),this.editingIndex=-1},onEnterDown(e){e.preventDefault(),!(this.getMenuIndex()>-1)&&this.$nextTick(this.updateSelf)},onKeyDown(e){const t=e.keyCode;(e.ctrlKey||![a.home,a.end].includes(t))&&n.options.methods.onKeyDown.call(this,e),this.multiple&&t===a.left&&this.$refs.input.selectionStart===0?this.updateSelf():t===a.enter&&this.onEnterDown(e),this.changeSelectedIndex(t)},onTabDown(e){if(this.multiple&&this.internalSearch&&this.getMenuIndex()===-1)return e.preventDefault(),e.stopPropagation(),this.updateTags();u.options.methods.onTabDown.call(this,e)},selectItem(e){this.editingIndex>-1?this.updateEditing():(u.options.methods.selectItem.call(this,e),this.internalSearch&&this.multiple&&this.getText(e).toLocaleLowerCase().includes(this.internalSearch.toLocaleLowerCase())&&(this.internalSearch=null))},setSelectedItems(){this.internalValue==null||this.internalValue===""?this.selectedItems=[]:this.selectedItems=this.multiple?this.internalValue:[this.internalValue]},setValue(e){n.options.methods.setValue.call(this,e===void 0?this.internalSearch:e)},updateEditing(){const e=this.internalValue.slice(),t=this.selectedItems.findIndex(s=>this.getText(s)===this.internalSearch);if(t>-1){const s=typeof e[t]=="object"?Object.assign({},e[t]):e[t];e.splice(t,1),e.push(s)}else e[this.editingIndex]=this.internalSearch;this.setValue(e),this.editingIndex=-1,this.internalSearch=null},updateCombobox(){if(!this.searchIsDirty)return;this.internalSearch!==this.getText(this.internalValue)&&this.setValue(),(!!this.$scopedSlots.selection||this.hasChips)&&(this.internalSearch=null)},updateSelf(){this.multiple?this.updateTags():this.updateCombobox()},updateTags(){const e=this.getMenuIndex();if(e<0&&!this.searchIsDirty||!this.internalSearch)return;if(this.editingIndex>-1)return this.updateEditing();const t=this.selectedItems.findIndex(i=>this.internalSearch===this.getText(i)),s=t>-1&&typeof this.selectedItems[t]=="object"?Object.assign({},this.selectedItems[t]):this.internalSearch;if(t>-1){const i=this.internalValue.slice();i.splice(t,1),this.setValue(i)}if(e>-1)return this.internalSearch=null;this.selectItem(s),this.internalSearch=null},onPaste(e){var t;if(this.$emit("paste",e),!this.multiple||this.searchIsDirty)return;const s=(t=e.clipboardData)===null||t===void 0?void 0:t.getData("text/vnd.vuetify.autocomplete.item+plain");s&&this.findExistingIndex(s)===-1&&(e.preventDefault(),n.options.methods.selectItem.call(this,s))},clearableCallback(){this.editingIndex=-1,u.options.methods.clearableCallback.call(this)}}});const tt=o.extend({name:"v-file-input",model:{prop:"value",event:"change"},props:{chips:Boolean,clearable:{type:Boolean,default:!0},counterSizeString:{type:String,default:"$vuetify.fileInput.counterSize"},counterString:{type:String,default:"$vuetify.fileInput.counter"},hideInput:Boolean,multiple:Boolean,placeholder:String,prependIcon:{type:String,default:"$file"},readonly:{type:Boolean,default:!1},showSize:{type:[Boolean,Number],default:!1,validator:e=>typeof e=="boolean"||[1e3,1024].includes(e)},smallChips:Boolean,truncateLength:{type:[Number,String],default:22},type:{type:String,default:"file"},value:{default:void 0,validator:e=>_(e).every(t=>t!=null&&typeof t=="object")}},computed:{classes(){return{...o.options.computed.classes.call(this),"v-file-input":!0}},computedCounterValue(){const e=this.multiple&&this.lazyValue?this.lazyValue.length:this.lazyValue instanceof File?1:0;if(!this.showSize)return this.$vuetify.lang.t(this.counterString,e);const t=this.internalArrayValue.reduce((s,{size:i=0})=>s+i,0);return this.$vuetify.lang.t(this.counterSizeString,e,I(t,this.base===1024))},internalArrayValue(){return _(this.internalValue)},internalValue:{get(){return this.lazyValue},set(e){this.lazyValue=e,this.$emit("change",this.lazyValue)}},isDirty(){return this.internalArrayValue.length>0},isLabelActive(){return this.isDirty},text(){return!this.isDirty&&(this.persistentPlaceholder||this.isFocused||!this.hasLabel)?[this.placeholder]:this.internalArrayValue.map(e=>{const{name:t="",size:s=0}=e,i=this.truncateText(t);return this.showSize?`${i} (${I(s,this.base===1024)})`:i})},base(){return typeof this.showSize!="boolean"?this.showSize:void 0},hasChips(){return this.chips||this.smallChips}},watch:{readonly:{handler(e){e===!0&&V("readonly is not supported on <v-file-input>",this)},immediate:!0},value(e){const t=this.multiple?e:e?[e]:[];L(t,this.$refs.input.files)||(this.$refs.input.value="")}},methods:{clearableCallback(){this.internalValue=this.multiple?[]:null,this.$refs.input.value=""},genChips(){return this.isDirty?this.text.map((e,t)=>this.$createElement(C,{props:{small:this.smallChips},on:{"click:close":()=>{const s=this.internalValue;s.splice(t,1),this.internalValue=s}}},[e])):[]},genControl(){const e=o.options.methods.genControl.call(this);return this.hideInput&&(e.data.style=M(e.data.style,{display:"none"})),e},genInput(){const e=o.options.methods.genInput.call(this);return e.data.attrs.multiple=this.multiple,delete e.data.domProps.value,delete e.data.on.input,e.data.on.change=this.onInput,[this.genSelections(),e]},genPrependSlot(){if(!this.prependIcon)return null;const e=this.genIcon("prepend",()=>{this.$refs.input.click()});return this.genSlot("prepend","outer",[e])},genSelectionText(){const e=this.text.length;return e<2?this.text:this.showSize&&!this.counter?[this.computedCounterValue]:[this.$vuetify.lang.t(this.counterString,e)]},genSelections(){const e=[];return this.isDirty&&this.$scopedSlots.selection?this.internalArrayValue.forEach((t,s)=>{this.$scopedSlots.selection&&e.push(this.$scopedSlots.selection({text:this.text[s],file:t,index:s}))}):e.push(this.hasChips&&this.isDirty?this.genChips():this.genSelectionText()),this.$createElement("div",{staticClass:"v-file-input__text",class:{"v-file-input__text--placeholder":this.placeholder&&!this.isDirty,"v-file-input__text--chips":this.hasChips&&!this.$scopedSlots.selection}},e)},genTextFieldSlot(){const e=o.options.methods.genTextFieldSlot.call(this);return e.data.on={...e.data.on||{},click:t=>{t.target&&t.target.nodeName==="LABEL"||this.$refs.input.click()}},e},onInput(e){const t=[...e.target.files||[]];this.internalValue=this.multiple?t:t[0],this.initialValue=this.internalValue},onKeyDown(e){this.$emit("keydown",e)},truncateText(e){if(e.length<Number(this.truncateLength))return e;const t=Math.floor((Number(this.truncateLength)-1)/2);return`${e.slice(0,t)}…${e.slice(e.length-t)}`}}});const et={name:"AddModal",mixins:[Z,Y],props:["initialMagnet","openSuddenly"],data(){return{dTransition:"scale-transition",hndlDialog:!0,showWrapDrag:!1,files:[],category:null,tags:[],directory:"",start:!0,skip_checking:!1,contentLayout:"Original",contentLayoutOptions:[{text:this.$t("enums.contentLayout.original"),value:f.ORIGINAL},{text:this.$t("enums.contentLayout.subfolder"),value:f.SUBFOLDER},{text:this.$t("enums.contentLayout.nosubfolder"),value:f.NO_SUBFOLDER}],stopCondition:"None",stopConditionOptions:[{text:this.$t("enums.stopCondition.none"),value:g.NONE},{text:this.$t("enums.stopCondition.metadataReceived"),value:g.METADATA_RECEIVED},{text:this.$t("enums.stopCondition.filesChecked"),value:g.FILES_CHECKED}],autoTMM:!0,sequentialDownload:!1,firstLastPiecePrio:!1,fileInputRules:[e=>{const t=e.every(s=>s.type?s.type==="application/x-bittorrent":/^.*\.torrent$/.test(s.name));return t||this.$t("modals.add.oneOrMoreFilesInvalidTorrent")}],loading:!1,urls:"",valid:!1,mdiCloudUpload:F,mdiFolder:A,mdiTag:E,mdiLabel:P,mdiPaperclip:z,mdiLink:O,mdiClose:B}},computed:{...D(["settings"]),...w(["getCategories","getAvailableTags"]),phoneLayout(){return this.$vuetify.breakpoint.xsOnly},savepath(){let e=this.settings.save_path;return this.category&&this.category.savePath&&(e=this.category.savePath),e},availableCategories(){return this.getCategories()},availableTags(){return this.getAvailableTags()}},created(){this.initialMagnet&&(this.urls=this.initialMagnet),this.setSettings(),this.openSuddenly===!0&&(this.dTransition="none")},mounted(){this.dTransition="scale-transition"},methods:{async setSettings(){await this.$store.dispatch("FETCH_SETTINGS"),await this.$store.commit("FETCH_CATEGORIES"),await this.$store.commit("FETCH_TAGS"),this.start=!this.settings.start_paused_enabled,this.autoTMM=this.settings.auto_tmm_enabled,this.directory=this.savepath,this.contentLayout=this.settings.torrent_content_layout,this.stopCondition=this.settings.torrent_stop_condition},addDropFile(e){this.showWrapDrag=!1,this.urls.length===0&&this.files.push(...Array.from(e.dataTransfer.files))},startDropFile(){this.showWrapDrag=!0},DragLeave(){this.showWrapDrag=!1},closeWrap(){this.showWrapDrag?this.showWrapDrag=!1:this.close()},async paste(e){if(navigator.clipboard&&window.isSecureContext)this.urls=await navigator.clipboard.readText();else if(e.target.focus(),!document.execCommand("paste")){this.$toast.error(this.$t("toast.pasteNotSupported").toString());return}this.$toast.success(this.$t("toast.pasteSuccess").toString())},async submit(){if(this.files.length===0&&this.urls.length===0)return;const e=[],t={urls:null,paused:!this.start,skip_checking:this.skip_checking,autoTMM:this.autoTMM,sequentialDownload:this.sequentialDownload,firstLastPiecePrio:this.firstLastPiecePrio,contentLayout:this.contentLayout,stopCondition:this.stopCondition};this.files.length&&e.push(...this.files),this.urls&&(t.urls=this.urls),this.category&&(t.category=this.category.name),this.tags&&(t.tags=this.tags.join(",")),this.autoTMM||(t.savepath=this.directory),await N.addTorrents(t,e),this.resetForm(),this.$store.commit("DELETE_MODAL",this.guid)},categoryChanged(){this.directory=this.savepath},resetForm(){this.url="",this.files=[],this.category=null,this.tags=[],this.directory=this.savepath,this.skip_checking=!1,this.contentLayout=this.settings.torrent_content_layout,this.stopCondition=this.settings.torrent_stop_condition},close(){this.dialog=!1}}};var st=function(){var t=this,s=t._self._c;return s(J,{attrs:{transition:t.dTransition,"content-class":t.phoneLayout?"rounded-0":"rounded-form","max-width":"500px",fullscreen:t.phoneLayout,persistent:""},on:{keydown:function(i){return!i.type.indexOf("key")&&t._k(i.keyCode,"enter",13,i.key,"Enter")?null:(i.preventDefault(),t.submit.apply(null,arguments))}},model:{value:t.dialog,callback:function(i){t.dialog=i},expression:"dialog"}},[s("div",{staticClass:"noselect",staticStyle:{position:"fixed",left:"0",top:"0",width:"100%",height:"100%"},on:{drop:function(i){return i.preventDefault(),t.addDropFile.apply(null,arguments)},dragover:function(i){i.preventDefault(),t.showWrapDrag=!0},dragend:function(i){i.preventDefault(),t.showWrapDrag=!1},dragleave:function(i){return i.preventDefault(),t.DragLeave.apply(null,arguments)}}}),s(j,{class:t.showWrapDrag?"wrap-drag":"",on:{drop:function(i){return i.preventDefault(),t.addDropFile.apply(null,arguments)},dragover:function(i){i.preventDefault(),t.showWrapDrag=!0},dragend:function(i){i.preventDefault(),t.showWrapDrag=!1}}},[s(x,{class:"pa-0 project done"},[s(R,{staticClass:"justify-center"},[s(q,{staticClass:"transparent",attrs:{flat:"",dense:""}},[s(K,{staticClass:"mx-auto"},[s("h2",[t._v(t._s(t.$t("modals.add.title")))])]),s(c,{staticClass:"transparent elevation-0",attrs:{fab:"",small:""},on:{click:t.close}},[s(d,[t._v(t._s(t.mdiClose))])],1)],1)],1),s(H,{staticClass:"pb-0"},[s(S,{ref:"form",model:{value:t.valid,callback:function(i){t.valid=i},expression:"valid"}},[s(x,[s(p,{attrs:{"no-gutters":""}},[s(m,{ref:"fileZone"},[t.urls.length===0?s(tt,{attrs:{color:"deep-purple accent-4",counter:"",label:t.$t("modals.add.selectFiles"),multiple:"","prepend-icon":t.mdiPaperclip,rules:t.fileInputRules,outlined:"","show-size":1e3},scopedSlots:t._u([{key:"selection",fn:function({index:i,text:l}){return[i<2?s(C,{attrs:{color:"deep-purple accent-4",dark:"",label:"",small:""}},[t._v(" "+t._s(l)+" ")]):i===2?s("span",{staticClass:"overline grey--text text--darken-3 mx-2"},[t._v(" +"+t._s(t.files.length-2)+" File(s) ")]):t._e()]}}],null,!1,828156555),model:{value:t.files,callback:function(i){t.files=i},expression:"files"}}):t._e(),t.files.length===0?s(X,{staticStyle:{"max-height":"200px","overflow-x":"hidden","overflow-y":"auto"},attrs:{label:t.$t("url"),"prepend-icon":t.mdiLink,rows:"1",required:"",autofocus:!t.phoneLayout,"auto-grow":"",clearable:"",hint:t.$t("modals.add.urlHint")},on:{"click:prepend":t.paste},model:{value:t.urls,callback:function(i){t.urls=i},expression:"urls"}}):t._e()],1)],1),s(b,{attrs:{items:t.availableTags,clearable:"",label:t.$t("tags"),"prepend-icon":t.mdiTag,multiple:"",chips:""},model:{value:t.tags,callback:function(i){t.tags=i},expression:"tags"}}),s(b,{attrs:{items:t.availableCategories,clearable:"",label:t.$t("category"),"item-text":"name","prepend-icon":t.mdiLabel},on:{input:t.categoryChanged},model:{value:t.category,callback:function(i){t.category=i},expression:"category"}}),s(o,{attrs:{disabled:t.autoTMM,label:t.$t("modals.add.downloadDirectory"),"prepend-icon":t.mdiFolder,autocomplete:"download-directory",name:"download-directory"},model:{value:t.directory,callback:function(i){t.directory=i},expression:"directory"}}),s(p,[s(m,{staticClass:"pt-0 pb-3",attrs:{cols:"12",sm:"6"}},[s("div",{staticClass:"d-flex flex-column align-center"},[s("p",{staticClass:"subtitle-1 mb-1"},[t._v(t._s(t.$t("enums.contentLayout.title")))]),s(n,{staticClass:"rounded-xl",attrs:{flat:"",solo:"",dense:"","hide-details":"","background-color":"background",items:t.contentLayoutOptions},model:{value:t.contentLayout,callback:function(i){t.contentLayout=i},expression:"contentLayout"}})],1)]),s(m,{staticClass:"pt-0 pb-3",attrs:{cols:"12",sm:"6"}},[s("div",{staticClass:"d-flex flex-column align-center"},[s("p",{staticClass:"subtitle-1 mb-1"},[t._v(t._s(t.$t("enums.stopCondition.title")))]),s(n,{staticClass:"rounded-xl",attrs:{flat:"",solo:"",dense:"","hide-details":"","background-color":"background",items:t.stopConditionOptions},model:{value:t.stopCondition,callback:function(i){t.stopCondition=i},expression:"stopCondition"}})],1)])],1),s(p,{attrs:{"no-gutters":""}},[s(r,{attrs:{xs12:"",sm6:""}},[s(h,{attrs:{label:t.$t("modals.add.starttorrent"),"hide-details":""},model:{value:t.start,callback:function(i){t.start=i},expression:"start"}})],1),s(r,{attrs:{xs12:"",sm6:""}},[s(h,{attrs:{label:t.$t("modals.add.skipHashCheck"),"hide-details":""},model:{value:t.skip_checking,callback:function(i){t.skip_checking=i},expression:"skip_checking"}})],1),s(r,{attrs:{xs12:"",sm6:""}},[s(h,{attrs:{label:t.$t("modals.add.automaticTorrentManagement"),"hide-details":""},model:{value:t.autoTMM,callback:function(i){t.autoTMM=i},expression:"autoTMM"}})],1),s(r,{attrs:{xs12:"",sm6:""}},[s(h,{attrs:{label:t.$t("rightClick.advanced.sequentialDownload"),"hide-details":""},model:{value:t.sequentialDownload,callback:function(i){t.sequentialDownload=i},expression:"sequentialDownload"}})],1),s(r,{attrs:{xs12:"",sm6:""}},[s(h,{attrs:{label:t.$t("rightClick.advanced.firstLastPriority"),"hide-details":""},model:{value:t.firstLastPiecePrio,callback:function(i){t.firstLastPiecePrio=i},expression:"firstLastPiecePrio"}})],1)],1)],1)],1)],1),s(U),s(S,[s(G,{staticClass:"justify-center"},[s(c,{staticClass:"accent white--text mx-0 mt-3",attrs:{text:"",disabled:!t.valid},on:{click:t.submit}},[t._v(" Add Torrent ")]),t.phoneLayout?s(Q,[s(c,{attrs:{color:"red",dark:"",absolute:"",bottom:"",right:""},on:{click:t.close}},[s(d,[t._v(t._s(t.mdiClose))])],1)],1):t._e()],1)],1)],1)],1),s("div",{directives:[{name:"show",rawName:"v-show",value:t.showWrapDrag,expression:"showWrapDrag"}],staticClass:"wrap-drag noselect",staticStyle:{position:"fixed",left:"0",top:"0",width:"100%",height:"100%","text-align":"center","background-color":"rgb(0, 0, 0, 0.5)"}},[s("div",{staticClass:"align white--text"},[s("div",[s(d,{staticClass:"white--text",attrs:{size:"40"}},[t._v(" "+t._s(t.mdiCloudUpload)+" ")])],1),s("div",[s("h3",[t._v(t._s(t.$t("modals.add.dropHereForAdd")))])])])])],1)},it=[],nt=W(et,st,it,!1,null,"46135d09",null,null);const yt=nt.exports;export{yt as default};
