import{bX as V,bY as z,bZ as U,w as d,b_ as B,e as c,_ as F,x as I,y as v,b$ as m,a1 as b,a2 as H,bS as D,c0 as M,b as p,c1 as L,bH as q,k as C,c2 as P,bP as K,c3 as R,f as X,aV as O,m as Y,c4 as Z,c5 as w,c6 as J,g as A,i as Q}from"./index-ffe23009.js";import{V as y}from"./vue-b220ace6.js";const tt=y.extend({name:"mouse",methods:{getDefaultMouseEventHandlers(t,e,s=!1){const i=Object.keys(this.$listeners).filter(n=>n.endsWith(t)).reduce((n,o)=>(n[o]={event:o.slice(0,-t.length)},n),{});return this.getMouseEventHandlers({...i,["contextmenu"+t]:{event:"contextmenu",prevent:!0,result:!1}},e,s)},getMouseEventHandlers(t,e,s=!1){const i={};for(const n in t){const o=t[n];if(!this.$listeners[n])continue;const r=(o.passive?"&":(o.once?"~":"")+(o.capture?"!":""))+o.event,h=l=>{var u,g;const f=l;if(o.button===void 0||f.buttons>0&&f.button===o.button){if(o.prevent&&l.preventDefault(),o.stop&&l.stopPropagation(),l&&"touches"in l){const S=" ",W=(u=l.currentTarget)===null||u===void 0?void 0:u.className.split(S),x=document.elementsFromPoint(l.changedTouches[0].clientX,l.changedTouches[0].clientY).find(G=>G.className.split(S).some(N=>W.includes(N)));if(x&&!(!((g=l.target)===null||g===void 0)&&g.isSameNode(x))){x.dispatchEvent(new TouchEvent(l.type,{changedTouches:l.changedTouches,targetTouches:l.targetTouches,touches:l.touches}));return}}s?this.$emit(n,l,e(l)):this.$emit(n,e(l),l)}return o.result};r in i?Array.isArray(i[r])?i[r].push(h):i[r]=[i[r],h]:i[r]=h}return i}}}),E=y.extend({name:"v-data",inheritAttrs:!1,props:{items:{type:Array,default:()=>[]},options:{type:Object,default:()=>({})},sortBy:{type:[String,Array]},sortDesc:{type:[Boolean,Array]},customSort:{type:Function,default:V},mustSort:Boolean,multiSort:Boolean,page:{type:Number,default:1},itemsPerPage:{type:Number,default:10},groupBy:{type:[String,Array],default:()=>[]},groupDesc:{type:[Boolean,Array],default:()=>[]},customGroup:{type:Function,default:z},locale:{type:String,default:"en-US"},disableSort:Boolean,disablePagination:Boolean,disableFiltering:Boolean,search:String,customFilter:{type:Function,default:U},serverItemsLength:{type:Number,default:-1}},data(){let t={page:this.page,itemsPerPage:this.itemsPerPage,sortBy:d(this.sortBy),sortDesc:d(this.sortDesc),groupBy:d(this.groupBy),groupDesc:d(this.groupDesc),mustSort:this.mustSort,multiSort:this.multiSort};this.options&&(t=Object.assign(t,this.options));const{sortBy:e,sortDesc:s,groupBy:i,groupDesc:n}=t,o=e.length-s.length,a=i.length-n.length;return o>0&&t.sortDesc.push(...B(o,!1)),a>0&&t.groupDesc.push(...B(a,!1)),{internalOptions:t}},computed:{itemsLength(){return this.serverItemsLength>=0?this.serverItemsLength:this.filteredItems.length},pageCount(){return this.internalOptions.itemsPerPage<=0?1:Math.ceil(this.itemsLength/this.internalOptions.itemsPerPage)},pageStart(){return this.internalOptions.itemsPerPage===-1||!this.items.length?0:(this.internalOptions.page-1)*this.internalOptions.itemsPerPage},pageStop(){return this.internalOptions.itemsPerPage===-1?this.itemsLength:this.items.length?Math.min(this.itemsLength,this.internalOptions.page*this.internalOptions.itemsPerPage):0},isGrouped(){return!!this.internalOptions.groupBy.length},pagination(){return{page:this.internalOptions.page,itemsPerPage:this.internalOptions.itemsPerPage,pageStart:this.pageStart,pageStop:this.pageStop,pageCount:this.pageCount,itemsLength:this.itemsLength}},filteredItems(){let t=this.items.slice();return!this.disableFiltering&&this.serverItemsLength<=0&&(t=this.customFilter(t,this.search)),t},computedItems(){let t=this.filteredItems.slice();return(!this.disableSort||this.internalOptions.groupBy.length)&&this.serverItemsLength<=0&&(t=this.sortItems(t)),!this.disablePagination&&this.serverItemsLength<=0&&(t=this.paginateItems(t)),t},groupedItems(){return this.isGrouped?this.groupItems(this.computedItems):null},scopedProps(){return{sort:this.sort,sortArray:this.sortArray,group:this.group,items:this.computedItems,options:this.internalOptions,updateOptions:this.updateOptions,pagination:this.pagination,groupedItems:this.groupedItems,originalItemsLength:this.items.length}},computedOptions(){return{...this.options}}},watch:{computedOptions:{handler(t,e){c(t,e)||this.updateOptions(t)},deep:!0,immediate:!0},internalOptions:{handler(t,e){c(t,e)||this.$emit("update:options",t)},deep:!0,immediate:!0},page(t){this.updateOptions({page:t})},"internalOptions.page"(t){this.$emit("update:page",t)},itemsPerPage(t){this.updateOptions({itemsPerPage:t})},"internalOptions.itemsPerPage"(t){this.$emit("update:items-per-page",t)},sortBy(t){this.updateOptions({sortBy:d(t)})},"internalOptions.sortBy"(t,e){!c(t,e)&&this.$emit("update:sort-by",Array.isArray(this.sortBy)?t:t[0])},sortDesc(t){this.updateOptions({sortDesc:d(t)})},"internalOptions.sortDesc"(t,e){!c(t,e)&&this.$emit("update:sort-desc",Array.isArray(this.sortDesc)?t:t[0])},groupBy(t){this.updateOptions({groupBy:d(t)})},"internalOptions.groupBy"(t,e){!c(t,e)&&this.$emit("update:group-by",Array.isArray(this.groupBy)?t:t[0])},groupDesc(t){this.updateOptions({groupDesc:d(t)})},"internalOptions.groupDesc"(t,e){!c(t,e)&&this.$emit("update:group-desc",Array.isArray(this.groupDesc)?t:t[0])},multiSort(t){this.updateOptions({multiSort:t})},"internalOptions.multiSort"(t){this.$emit("update:multi-sort",t)},mustSort(t){this.updateOptions({mustSort:t})},"internalOptions.mustSort"(t){this.$emit("update:must-sort",t)},pageCount:{handler(t){this.$emit("page-count",t)},immediate:!0},computedItems:{handler(t){this.$emit("current-items",t)},immediate:!0},pagination:{handler(t,e){c(t,e)||this.$emit("pagination",this.pagination)},immediate:!0}},methods:{toggle(t,e,s,i,n,o){let a=e.slice(),r=s.slice();const h=a.findIndex(l=>l===t);return h<0?(o||(a=[],r=[]),a.push(t),r.push(!1)):h>=0&&!r[h]?r[h]=!0:n?r[h]=!1:(a.splice(h,1),r.splice(h,1)),(!c(a,e)||!c(r,s))&&(i=1),{by:a,desc:r,page:i}},group(t){const{by:e,desc:s,page:i}=this.toggle(t,this.internalOptions.groupBy,this.internalOptions.groupDesc,this.internalOptions.page,!0,!1);this.updateOptions({groupBy:e,groupDesc:s,page:i})},sort(t){if(Array.isArray(t))return this.sortArray(t);const{by:e,desc:s,page:i}=this.toggle(t,this.internalOptions.sortBy,this.internalOptions.sortDesc,this.internalOptions.page,this.internalOptions.mustSort,this.internalOptions.multiSort);this.updateOptions({sortBy:e,sortDesc:s,page:i})},sortArray(t){const e=t.map(s=>{const i=this.internalOptions.sortBy.findIndex(n=>n===s);return i>-1?this.internalOptions.sortDesc[i]:!1});this.updateOptions({sortBy:t,sortDesc:e})},updateOptions(t){this.internalOptions={...this.internalOptions,...t,page:this.serverItemsLength<0?Math.max(1,Math.min(t.page||this.internalOptions.page,this.pageCount)):t.page||this.internalOptions.page}},sortItems(t){let e=[],s=[];return this.disableSort||(e=this.internalOptions.sortBy,s=this.internalOptions.sortDesc),this.internalOptions.groupBy.length&&(e=[...this.internalOptions.groupBy,...e],s=[...this.internalOptions.groupDesc,...s]),this.customSort(t,e,s,this.locale)},groupItems(t){return this.customGroup(t,this.internalOptions.groupBy,this.internalOptions.groupDesc)},paginateItems(t){return this.serverItemsLength===-1&&t.length<=this.pageStart&&(this.internalOptions.page=Math.max(1,Math.ceil(t.length/this.internalOptions.itemsPerPage))||1),t.slice(this.pageStart,this.pageStop)}},render(){return this.$scopedSlots.default&&this.$scopedSlots.default(this.scopedProps)}});const j=y.extend({name:"v-data-footer",props:{options:{type:Object,required:!0},pagination:{type:Object,required:!0},itemsPerPageOptions:{type:Array,default:()=>[5,10,15,-1]},prevIcon:{type:String,default:"$prev"},nextIcon:{type:String,default:"$next"},firstIcon:{type:String,default:"$first"},lastIcon:{type:String,default:"$last"},itemsPerPageText:{type:String,default:"$vuetify.dataFooter.itemsPerPageText"},itemsPerPageAllText:{type:String,default:"$vuetify.dataFooter.itemsPerPageAll"},showFirstLastPage:Boolean,showCurrentPage:Boolean,disablePagination:Boolean,disableItemsPerPage:Boolean,pageText:{type:String,default:"$vuetify.dataFooter.pageText"}},computed:{disableNextPageIcon(){return this.options.itemsPerPage<=0||this.options.page*this.options.itemsPerPage>=this.pagination.itemsLength||this.pagination.pageStop<0},computedDataItemsPerPageOptions(){return this.itemsPerPageOptions.map(t=>typeof t=="object"?t:this.genDataItemsPerPageOption(t))}},methods:{updateOptions(t){this.$emit("update:options",Object.assign({},this.options,t))},onFirstPage(){this.updateOptions({page:1})},onPreviousPage(){this.updateOptions({page:this.options.page-1})},onNextPage(){this.updateOptions({page:this.options.page+1})},onLastPage(){this.updateOptions({page:this.pagination.pageCount})},onChangeItemsPerPage(t){this.updateOptions({itemsPerPage:t,page:1})},genDataItemsPerPageOption(t){return{text:t===-1?this.$vuetify.lang.t(this.itemsPerPageAllText):String(t),value:t}},genItemsPerPageSelect(){let t=this.options.itemsPerPage;const e=this.computedDataItemsPerPageOptions;return e.length<=1?null:(e.find(s=>s.value===t)||(t=e[0]),this.$createElement("div",{staticClass:"v-data-footer__select"},[this.$vuetify.lang.t(this.itemsPerPageText),this.$createElement(F,{attrs:{"aria-label":this.$vuetify.lang.t(this.itemsPerPageText)},props:{disabled:this.disableItemsPerPage,items:e,value:t,hideDetails:!0,auto:!0,minWidth:"75px"},on:{input:this.onChangeItemsPerPage}})]))},genPaginationInfo(){let t=["–"];const e=this.pagination.itemsLength;let s=this.pagination.pageStart,i=this.pagination.pageStop;return this.pagination.itemsLength&&this.pagination.itemsPerPage?(s=this.pagination.pageStart+1,i=e<this.pagination.pageStop||this.pagination.pageStop<0?e:this.pagination.pageStop,t=this.$scopedSlots["page-text"]?[this.$scopedSlots["page-text"]({pageStart:s,pageStop:i,itemsLength:e})]:[this.$vuetify.lang.t(this.pageText,s,i,e)]):this.$scopedSlots["page-text"]&&(t=[this.$scopedSlots["page-text"]({pageStart:s,pageStop:i,itemsLength:e})]),this.$createElement("div",{class:"v-data-footer__pagination"},t)},genIcon(t,e,s,i){return this.$createElement(I,{props:{disabled:e||this.disablePagination,icon:!0,text:!0},on:{click:t},attrs:{"aria-label":s}},[this.$createElement(v,i)])},genIcons(){const t=[],e=[];return t.push(this.genIcon(this.onPreviousPage,this.options.page===1,this.$vuetify.lang.t("$vuetify.dataFooter.prevPage"),this.$vuetify.rtl?this.nextIcon:this.prevIcon)),e.push(this.genIcon(this.onNextPage,this.disableNextPageIcon,this.$vuetify.lang.t("$vuetify.dataFooter.nextPage"),this.$vuetify.rtl?this.prevIcon:this.nextIcon)),this.showFirstLastPage&&(t.unshift(this.genIcon(this.onFirstPage,this.options.page===1,this.$vuetify.lang.t("$vuetify.dataFooter.firstPage"),this.$vuetify.rtl?this.lastIcon:this.firstIcon)),e.push(this.genIcon(this.onLastPage,this.options.page>=this.pagination.pageCount||this.options.itemsPerPage===-1,this.$vuetify.lang.t("$vuetify.dataFooter.lastPage"),this.$vuetify.rtl?this.firstIcon:this.lastIcon))),[this.$createElement("div",{staticClass:"v-data-footer__icons-before"},t),this.showCurrentPage&&this.$createElement("span",[this.options.page.toString()]),this.$createElement("div",{staticClass:"v-data-footer__icons-after"},e)]}},render(){return this.$createElement("div",{staticClass:"v-data-footer"},[m(this,"prepend"),this.genItemsPerPageSelect(),this.genPaginationInfo(),this.genIcons()])}}),T=b(D,H).extend({name:"v-data-iterator",props:{...E.options.props,itemKey:{type:String,default:"id"},value:{type:Array,default:()=>[]},singleSelect:Boolean,expanded:{type:Array,default:()=>[]},mobileBreakpoint:{...D.options.props.mobileBreakpoint,default:600},singleExpand:Boolean,loading:[Boolean,String],noResultsText:{type:String,default:"$vuetify.dataIterator.noResultsText"},noDataText:{type:String,default:"$vuetify.noDataText"},loadingText:{type:String,default:"$vuetify.dataIterator.loadingText"},hideDefaultFooter:Boolean,footerProps:Object,selectableKey:{type:String,default:"isSelectable"}},data:()=>({selection:{},expansion:{},internalCurrentItems:[],shiftKeyDown:!1,lastEntry:-1}),computed:{everyItem(){return!!this.selectableItems.length&&this.selectableItems.every(t=>this.isSelected(t))},someItems(){return this.selectableItems.some(t=>this.isSelected(t))},sanitizedFooterProps(){return M(this.footerProps)},selectableItems(){return this.internalCurrentItems.filter(t=>this.isSelectable(t))}},watch:{value:{handler(t){this.selection=t.reduce((e,s)=>(e[p(s,this.itemKey)]=s,e),{})},immediate:!0},selection(t,e){c(Object.keys(t),Object.keys(e))||this.$emit("input",Object.values(t))},expanded:{handler(t){this.expansion=t.reduce((e,s)=>(e[p(s,this.itemKey)]=!0,e),{})},immediate:!0},expansion(t,e){if(c(t,e))return;const s=Object.keys(t).filter(n=>t[n]),i=s.length?this.items.filter(n=>s.includes(String(p(n,this.itemKey)))):[];this.$emit("update:expanded",i)}},created(){[["disable-initial-sort","sort-by"],["filter","custom-filter"],["pagination","options"],["total-items","server-items-length"],["hide-actions","hide-default-footer"],["rows-per-page-items","footer-props.items-per-page-options"],["rows-per-page-text","footer-props.items-per-page-text"],["prev-icon","footer-props.prev-icon"],["next-icon","footer-props.next-icon"]].forEach(([s,i])=>{this.$attrs.hasOwnProperty(s)&&L(s,i,this)}),["expand","content-class","content-props","content-tag"].forEach(s=>{this.$attrs.hasOwnProperty(s)&&q(s)})},mounted(){window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp)},beforeDestroy(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp)},methods:{onKeyDown(t){this.shiftKeyDown=t.keyCode===C.shift||t.shiftKey},onKeyUp(t){(t.keyCode===C.shift||!t.shiftKey)&&(this.shiftKeyDown=!1)},toggleSelectAll(t){const e=Object.assign({},this.selection);for(let s=0;s<this.selectableItems.length;s++){const i=this.selectableItems[s];if(!this.isSelectable(i))continue;const n=p(i,this.itemKey);t?e[n]=i:delete e[n]}this.selection=e,this.$emit("toggle-select-all",{items:this.internalCurrentItems,value:t})},isSelectable(t){return p(t,this.selectableKey)!==!1},isSelected(t){return!!this.selection[p(t,this.itemKey)]||!1},select(t,e=!0,s=!0){if(!this.isSelectable(t))return;const i=this.singleSelect?{}:Object.assign({},this.selection),n=p(t,this.itemKey);e?i[n]=t:delete i[n];const o=this.selectableItems.findIndex(a=>p(a,this.itemKey)===n);if(this.lastEntry===-1)this.lastEntry=o;else if(this.shiftKeyDown&&!this.singleSelect&&s){const a=p(this.selectableItems[this.lastEntry],this.itemKey),r=Object.keys(this.selection).includes(String(a));this.multipleSelect(r,s,i,o)}if(this.lastEntry=o,this.singleSelect&&s){const a=Object.keys(this.selection),r=a.length&&p(this.selection[a[0]],this.itemKey);r&&r!==n&&this.$emit("item-selected",{item:this.selection[r],value:!1})}this.selection=i,s&&this.$emit("item-selected",{item:t,value:e})},multipleSelect(t=!0,e=!0,s,i){const n=i<this.lastEntry?i:this.lastEntry,o=i<this.lastEntry?this.lastEntry:i;for(let a=n;a<=o;a++){const r=this.selectableItems[a],h=p(r,this.itemKey);t?s[h]=r:delete s[h],e&&this.$emit("item-selected",{currentItem:r,value:t})}},isExpanded(t){return this.expansion[p(t,this.itemKey)]||!1},expand(t,e=!0){const s=this.singleExpand?{}:Object.assign({},this.expansion),i=p(t,this.itemKey);e?s[i]=!0:delete s[i],this.expansion=s,this.$emit("item-expanded",{item:t,value:e})},createItemProps(t,e){return{item:t,index:e,select:s=>this.select(t,s),isSelected:this.isSelected(t),expand:s=>this.expand(t,s),isExpanded:this.isExpanded(t),isMobile:this.isMobile}},genEmptyWrapper(t){return this.$createElement("div",t)},genEmpty(t,e){if(t===0&&this.loading){const s=this.$slots.loading||this.$vuetify.lang.t(this.loadingText);return this.genEmptyWrapper(s)}else if(t===0){const s=this.$slots["no-data"]||this.$vuetify.lang.t(this.noDataText);return this.genEmptyWrapper(s)}else if(e===0){const s=this.$slots["no-results"]||this.$vuetify.lang.t(this.noResultsText);return this.genEmptyWrapper(s)}return null},genItems(t){const e=this.genEmpty(t.originalItemsLength,t.pagination.itemsLength);return e?[e]:this.$scopedSlots.default?this.$scopedSlots.default({...t,isSelected:this.isSelected,select:this.select,isExpanded:this.isExpanded,isMobile:this.isMobile,expand:this.expand}):this.$scopedSlots.item?t.items.map((s,i)=>this.$scopedSlots.item(this.createItemProps(s,i))):[]},genFooter(t){if(this.hideDefaultFooter)return null;const e={props:{...this.sanitizedFooterProps,options:t.options,pagination:t.pagination},on:{"update:options":i=>t.updateOptions(i)}},s=P("footer.",this.$scopedSlots);return this.$createElement(j,{scopedSlots:s,...e})},genDefaultScopedSlot(t){const e={...t,someItems:this.someItems,everyItem:this.everyItem,toggleSelectAll:this.toggleSelectAll};return this.$createElement("div",{staticClass:"v-data-iterator"},[m(this,"header",e,!0),this.genItems(t),this.genFooter(t),m(this,"footer",e,!0)])}},render(){return this.$createElement(E,{props:this.$props,on:{"update:options":(t,e)=>!c(t,e)&&this.$emit("update:options",t),"update:page":t=>this.$emit("update:page",t),"update:items-per-page":t=>this.$emit("update:items-per-page",t),"update:sort-by":t=>this.$emit("update:sort-by",t),"update:sort-desc":t=>this.$emit("update:sort-desc",t),"update:group-by":t=>this.$emit("update:group-by",t),"update:group-desc":t=>this.$emit("update:group-desc",t),pagination:(t,e)=>!c(t,e)&&this.$emit("pagination",t),"current-items":t=>{this.internalCurrentItems=t,this.$emit("current-items",t)},"page-count":t=>this.$emit("page-count",t)},scopedSlots:{default:this.genDefaultScopedSlot}})}});const _=b().extend({directives:{ripple:K},props:{headers:{type:Array,default:()=>[]},options:{type:Object,default:()=>({page:1,itemsPerPage:10,sortBy:[],sortDesc:[],groupBy:[],groupDesc:[],multiSort:!1,mustSort:!1})},checkboxColor:String,sortIcon:{type:String,default:"$sort"},everyItem:Boolean,someItems:Boolean,showGroupBy:Boolean,singleSelect:Boolean,disableSort:Boolean},methods:{genSelectAll(){var t;const e={props:{value:this.everyItem,indeterminate:!this.everyItem&&this.someItems,color:(t=this.checkboxColor)!==null&&t!==void 0?t:""},on:{input:s=>this.$emit("toggle-select-all",s)}};return this.$scopedSlots["data-table-select"]?this.$scopedSlots["data-table-select"](e):this.$createElement(R,{staticClass:"v-data-table__checkbox",...e})},genSortIcon(){return this.$createElement(v,{staticClass:"v-data-table-header__icon",props:{size:18}},[this.sortIcon])}}}),et=b(_).extend({name:"v-data-table-header-mobile",props:{sortByText:{type:String,default:"$vuetify.dataTable.sortBy"}},methods:{genSortChip(t){const e=[t.item.text],s=this.options.sortBy.findIndex(o=>o===t.item.value),i=s>=0,n=this.options.sortDesc[s];return e.push(this.$createElement("div",{staticClass:"v-chip__close",class:{sortable:!0,active:i,asc:i&&!n,desc:i&&n}},[this.genSortIcon()])),this.$createElement(X,{staticClass:"sortable",on:{click:o=>{o.stopPropagation(),this.$emit("sort",t.item.value)}}},e)},genSortSelect(t){return this.$createElement(F,{props:{label:this.$vuetify.lang.t(this.sortByText),items:t,hideDetails:!0,multiple:this.options.multiSort,value:this.options.multiSort?this.options.sortBy:this.options.sortBy[0],menuProps:{closeOnContentClick:!0}},on:{change:e=>this.$emit("sort",e)},scopedSlots:{selection:e=>this.genSortChip(e)}})}},render(t){const e=[],s=this.headers.find(a=>a.value==="data-table-select");s&&!this.singleSelect&&e.push(this.$createElement("div",{class:["v-data-table-header-mobile__select",...d(s.class)],attrs:{width:s.width}},[this.genSelectAll()]));const i=this.headers.filter(a=>a.sortable!==!1&&a.value!=="data-table-select").map(a=>({text:a.text,value:a.value}));!this.disableSort&&i.length&&e.push(this.genSortSelect(i));const n=e.length?t("th",[t("div",{staticClass:"v-data-table-header-mobile__wrapper"},e)]):void 0,o=t("tr",[n]);return t("thead",{staticClass:"v-data-table-header v-data-table-header-mobile"},[o])}}),st=b(_).extend({name:"v-data-table-header-desktop",methods:{genGroupByToggle(t){return this.$createElement("span",{on:{click:e=>{e.stopPropagation(),this.$emit("group",t.value)}}},["group"])},getAria(t,e){const s=o=>this.$vuetify.lang.t(`$vuetify.dataTable.ariaLabel.${o}`);let i="none",n=[s("sortNone"),s("activateAscending")];return t?(e?(i="descending",n=[s("sortDescending"),s(this.options.mustSort?"activateAscending":"activateNone")]):(i="ascending",n=[s("sortAscending"),s("activateDescending")]),{ariaSort:i,ariaLabel:n.join(" ")}):{ariaSort:i,ariaLabel:n.join(" ")}},genHeader(t){const e={attrs:{role:"columnheader",scope:"col","aria-label":t.text||""},style:{width:O(t.width),minWidth:O(t.width)},class:[`text-${t.align||"start"}`,...d(t.class),t.divider&&"v-data-table__divider"],on:{}},s=[];if(t.value==="data-table-select"&&!this.singleSelect)return this.$createElement("th",e,[this.genSelectAll()]);if(s.push(this.$scopedSlots.hasOwnProperty(t.value)?this.$scopedSlots[t.value]({header:t}):this.$createElement("span",[t.text])),!this.disableSort&&(t.sortable||!t.hasOwnProperty("sortable"))){e.on.click=()=>this.$emit("sort",t.value);const i=this.options.sortBy.findIndex(h=>h===t.value),n=i>=0,o=this.options.sortDesc[i];e.class.push("sortable");const{ariaLabel:a,ariaSort:r}=this.getAria(n,o);e.attrs["aria-label"]+=`${t.text?": ":""}${a}`,e.attrs["aria-sort"]=r,n&&(e.class.push("active"),e.class.push(o?"desc":"asc")),t.align==="end"?s.unshift(this.genSortIcon()):s.push(this.genSortIcon()),this.options.multiSort&&n&&s.push(this.$createElement("span",{class:"v-data-table-header__sort-badge"},[String(i+1)]))}return this.showGroupBy&&t.groupable!==!1&&s.push(this.genGroupByToggle(t)),this.$createElement("th",e,s)}},render(){return this.$createElement("thead",{staticClass:"v-data-table-header"},[this.$createElement("tr",this.headers.map(t=>this.genHeader(t)))])}});function it(t){if(t.model&&t.on&&t.on.input)if(Array.isArray(t.on.input)){const e=t.on.input.indexOf(t.model.callback);e>-1&&t.on.input.splice(e,1)}else delete t.on.input}function nt(t,e){const s=[];for(const i in t)t.hasOwnProperty(i)&&s.push(e("template",{slot:i},t[i]));return s}const at=y.extend({name:"v-data-table-header",functional:!0,props:{..._.options.props,mobile:Boolean},render(t,{props:e,data:s,slots:i}){it(s);const n=nt(i(),t);return s=Y(s,{props:e}),e.mobile?t(et,s,n):t(st,s,n)}});function ot(t){var e;return t.length!==1||!["td","th"].includes((e=t[0])===null||e===void 0?void 0:e.tag)}const rt=y.extend({name:"row",functional:!0,props:{headers:Array,index:Number,item:Object,rtl:Boolean},render(t,{props:e,slots:s,data:i}){const n=s(),o=e.headers.map(a=>{const r=[],h=p(e.item,a.value),l=a.value,u=i.scopedSlots&&i.scopedSlots.hasOwnProperty(l)&&i.scopedSlots[l],g=n.hasOwnProperty(l)&&n[l];u?r.push(...d(u({item:e.item,isMobile:!1,header:a,index:e.index,value:h}))):g?r.push(...d(g)):r.push(h==null?h:String(h));const f=`text-${a.align||"start"}`;return ot(r)?t("td",{class:[f,a.cellClass,{"v-data-table__divider":a.divider}]},r):r});return t("tr",i,o)}}),k=y.extend({name:"row-group",functional:!0,props:{value:{type:Boolean,default:!0},headerClass:{type:String,default:"v-row-group__header"},contentClass:String,summaryClass:{type:String,default:"v-row-group__summary"}},render(t,{slots:e,props:s}){const i=e(),n=[];return i["column.header"]?n.push(t("tr",{staticClass:s.headerClass},i["column.header"])):i["row.header"]&&n.push(...i["row.header"]),i["row.content"]&&s.value&&n.push(...i["row.content"]),i["column.summary"]?n.push(t("tr",{staticClass:s.summaryClass},i["column.summary"])):i["row.summary"]&&n.push(...i["row.summary"]),n}});const lt=b(H).extend({name:"v-simple-table",props:{dense:Boolean,fixedHeader:Boolean,height:[Number,String]},computed:{classes(){return{"v-data-table--dense":this.dense,"v-data-table--fixed-height":!!this.height&&!this.fixedHeader,"v-data-table--fixed-header":this.fixedHeader,"v-data-table--has-top":!!this.$slots.top,"v-data-table--has-bottom":!!this.$slots.bottom,...this.themeClasses}}},methods:{genWrapper(){return this.$slots.wrapper||this.$createElement("div",{staticClass:"v-data-table__wrapper",style:{height:O(this.height)}},[this.$createElement("table",this.$slots.default)])}},render(t){return t("div",{staticClass:"v-data-table",class:this.classes},[this.$slots.top,this.genWrapper(),this.$slots.bottom])}}),ht=y.extend({name:"row",functional:!0,props:{headers:Array,hideDefaultHeader:Boolean,index:Number,item:Object,rtl:Boolean},render(t,{props:e,slots:s,data:i}){const n=s(),o=e.headers.map(a=>{const r={"v-data-table__mobile-row":!0},h=[],l=p(e.item,a.value),u=a.value,g=i.scopedSlots&&i.scopedSlots.hasOwnProperty(u)&&i.scopedSlots[u],f=n.hasOwnProperty(u)&&n[u];g?h.push(g({item:e.item,isMobile:!0,header:a,index:e.index,value:l})):f?h.push(f):h.push(l==null?l:String(l));const S=[t("div",{staticClass:"v-data-table__mobile-row__cell"},h)];return a.value!=="dataTableSelect"&&!e.hideDefaultHeader&&S.unshift(t("div",{staticClass:"v-data-table__mobile-row__header"},[a.text])),t("td",{class:r},S)});return t("tr",{...i,staticClass:"v-data-table__mobile-table-row"},o)}});function $(t,e,s){return i=>{const n=p(t,i.value);return i.filter?i.filter(n,e,t):s(n,e,t)}}function pt(t,e,s,i,n,o){return e=typeof e=="string"?e.trim():null,o==="union"?!(e&&i.length)&&!s.length?t:t.filter(a=>s.length&&s.every($(a,e,w))?!0:e&&i.some($(a,e,n))):o==="intersection"?t.filter(a=>{const r=s.every($(a,e,w)),h=!e||i.some($(a,e,n));return r&&h}):t}const gt=b(T,Z,tt).extend({name:"v-data-table",directives:{ripple:K},props:{headers:{type:Array,default:()=>[]},showSelect:Boolean,checkboxColor:String,showExpand:Boolean,showGroupBy:Boolean,height:[Number,String],hideDefaultHeader:Boolean,caption:String,dense:Boolean,headerProps:Object,calculateWidths:Boolean,fixedHeader:Boolean,headersLength:Number,expandIcon:{type:String,default:"$expand"},customFilter:{type:Function,default:w},filterMode:{type:String,default:"intersection"},itemClass:{type:[String,Function],default:()=>""},itemStyle:{type:[String,Function],default:()=>""},loaderHeight:{type:[Number,String],default:4}},data(){return{internalGroupBy:[],openCache:{},widths:[]}},computed:{computedHeaders(){if(!this.headers)return[];const t=this.headers.filter(s=>s.value===void 0||!this.internalGroupBy.find(i=>i===s.value)),e={text:"",sortable:!1,width:"1px"};if(this.showSelect){const s=t.findIndex(i=>i.value==="data-table-select");s<0?t.unshift({...e,value:"data-table-select"}):t.splice(s,1,{...e,...t[s]})}if(this.showExpand){const s=t.findIndex(i=>i.value==="data-table-expand");s<0?t.unshift({...e,value:"data-table-expand"}):t.splice(s,1,{...e,...t[s]})}return t},colspanAttrs(){return this.isMobile?void 0:{colspan:this.headersLength||this.computedHeaders.length}},columnSorters(){return this.computedHeaders.reduce((t,e)=>(e.sort&&(t[e.value]=e.sort),t),{})},headersWithCustomFilters(){return this.headers.filter(t=>t.filter&&(!t.hasOwnProperty("filterable")||t.filterable===!0))},headersWithoutCustomFilters(){return this.headers.filter(t=>!t.filter&&(!t.hasOwnProperty("filterable")||t.filterable===!0))},sanitizedHeaderProps(){return M(this.headerProps)},computedItemsPerPage(){const t=this.options&&this.options.itemsPerPage?this.options.itemsPerPage:this.itemsPerPage,e=this.sanitizedFooterProps.itemsPerPageOptions;if(e&&!e.find(s=>typeof s=="number"?s===t:s.value===t)){const s=e[0];return typeof s=="object"?s.value:s}return t},groupByText(){var t,e,s;return(s=(e=(t=this.headers)===null||t===void 0?void 0:t.find(i=>{var n;return i.value===((n=this.internalGroupBy)===null||n===void 0?void 0:n[0])}))===null||e===void 0?void 0:e.text)!==null&&s!==void 0?s:""}},created(){[["sort-icon","header-props.sort-icon"],["hide-headers","hide-default-header"],["select-all","show-select"]].forEach(([e,s])=>{this.$attrs.hasOwnProperty(e)&&L(e,s,this)})},mounted(){this.calculateWidths&&(window.addEventListener("resize",this.calcWidths),this.calcWidths())},beforeDestroy(){this.calculateWidths&&window.removeEventListener("resize",this.calcWidths)},methods:{calcWidths(){this.widths=Array.from(this.$el.querySelectorAll("th")).map(t=>t.clientWidth)},customFilterWithColumns(t,e){return pt(t,e,this.headersWithCustomFilters,this.headersWithoutCustomFilters,this.customFilter,this.filterMode)},customSortWithHeaders(t,e,s,i){return this.customSort(t,e,s,i,this.columnSorters)},createItemProps(t,e){const s={...T.options.methods.createItemProps.call(this,t,e),headers:this.computedHeaders};return{...s,attrs:{class:{"v-data-table__selected":s.isSelected}},on:{...this.getDefaultMouseEventHandlers(":row",()=>s,!0),click:i=>this.$emit("click:row",t,s,i)}}},genCaption(t){return this.caption?[this.$createElement("caption",[this.caption])]:m(this,"caption",t,!0)},genColgroup(t){return this.$createElement("colgroup",this.computedHeaders.map(e=>this.$createElement("col",{class:{divider:e.divider}})))},genLoading(){const t=this.$createElement("th",{staticClass:"column",attrs:this.colspanAttrs},[this.genProgress()]),e=this.$createElement("tr",{staticClass:"v-data-table__progress"},[t]);return this.$createElement("thead",[e])},genHeaders(t){const e={props:{...this.sanitizedHeaderProps,headers:this.computedHeaders,options:t.options,mobile:this.isMobile,showGroupBy:this.showGroupBy,checkboxColor:this.checkboxColor,someItems:this.someItems,everyItem:this.everyItem,singleSelect:this.singleSelect,disableSort:this.disableSort},on:{sort:t.sort,group:t.group,"toggle-select-all":this.toggleSelectAll}},s=[m(this,"header",{...e,isMobile:this.isMobile})];if(!this.hideDefaultHeader){const i=P("header.",this.$scopedSlots);s.push(this.$createElement(at,{...e,scopedSlots:i}))}return this.loading&&s.push(this.genLoading()),s},genEmptyWrapper(t){return this.$createElement("tr",{staticClass:"v-data-table__empty-wrapper"},[this.$createElement("td",{attrs:this.colspanAttrs},t)])},genItems(t,e){const s=this.genEmpty(e.originalItemsLength,e.pagination.itemsLength);return s?[s]:e.groupedItems?this.genGroupedRows(e.groupedItems,e):this.genRows(t,e)},genGroupedRows(t,e){return t.map(s=>(this.openCache.hasOwnProperty(s.name)||this.$set(this.openCache,s.name,!0),this.$scopedSlots.group?this.$scopedSlots.group({group:s.name,options:e.options,isMobile:this.isMobile,items:s.items,headers:this.computedHeaders}):this.genDefaultGroupedRow(s.name,s.items,e)))},genDefaultGroupedRow(t,e,s){const i=!!this.openCache[t],n=[this.$createElement("template",{slot:"row.content"},this.genRows(e,s))],o=()=>this.$set(this.openCache,t,!this.openCache[t]),a=()=>s.updateOptions({groupBy:[],groupDesc:[]});if(this.$scopedSlots["group.header"])n.unshift(this.$createElement("template",{slot:"column.header"},[this.$scopedSlots["group.header"]({group:t,groupBy:s.options.groupBy,isMobile:this.isMobile,items:e,headers:this.computedHeaders,isOpen:i,toggle:o,remove:a})]));else{const r=this.$createElement(I,{staticClass:"ma-0",props:{icon:!0,small:!0},on:{click:o}},[this.$createElement(v,[i?"$minus":"$plus"])]),h=this.$createElement(I,{staticClass:"ma-0",props:{icon:!0,small:!0},on:{click:a}},[this.$createElement(v,["$close"])]),l=this.$createElement("td",{staticClass:"text-start",attrs:this.colspanAttrs},[r,`${this.groupByText}: ${t}`,h]);n.unshift(this.$createElement("template",{slot:"column.header"},[l]))}return this.$scopedSlots["group.summary"]&&n.push(this.$createElement("template",{slot:"column.summary"},[this.$scopedSlots["group.summary"]({group:t,groupBy:s.options.groupBy,isMobile:this.isMobile,items:e,headers:this.computedHeaders,isOpen:i,toggle:o})])),this.$createElement(k,{key:t,props:{value:i}},n)},genRows(t,e){return this.$scopedSlots.item?this.genScopedRows(t,e):this.genDefaultRows(t,e)},genScopedRows(t,e){const s=[];for(let i=0;i<t.length;i++){const n=t[i];s.push(this.$scopedSlots.item({...this.createItemProps(n,i),isMobile:this.isMobile})),this.isExpanded(n)&&s.push(this.$scopedSlots["expanded-item"]({headers:this.computedHeaders,isMobile:this.isMobile,index:i,item:n}))}return s},genDefaultRows(t,e){return this.$scopedSlots["expanded-item"]?t.map((s,i)=>this.genDefaultExpandedRow(s,i)):t.map((s,i)=>this.genDefaultSimpleRow(s,i))},genDefaultExpandedRow(t,e){const s=this.isExpanded(t),i={"v-data-table__expanded v-data-table__expanded__row":s},n=this.genDefaultSimpleRow(t,e,i),o=this.$createElement("tr",{staticClass:"v-data-table__expanded v-data-table__expanded__content"},[this.$scopedSlots["expanded-item"]({headers:this.computedHeaders,isMobile:this.isMobile,item:t})]);return this.$createElement(k,{props:{value:s}},[this.$createElement("template",{slot:"row.header"},[n]),this.$createElement("template",{slot:"row.content"},[o])])},genDefaultSimpleRow(t,e,s={}){const i=P("item.",this.$scopedSlots),n=this.createItemProps(t,e);if(this.showSelect){const o=i["data-table-select"];i["data-table-select"]=o?()=>o({...n,isMobile:this.isMobile}):()=>{var a;return this.$createElement(R,{staticClass:"v-data-table__checkbox",props:{value:n.isSelected,disabled:!this.isSelectable(t),color:(a=this.checkboxColor)!==null&&a!==void 0?a:""},on:{input:r=>n.select(r)}})}}if(this.showExpand){const o=i["data-table-expand"];i["data-table-expand"]=o?()=>o(n):()=>this.$createElement(v,{staticClass:"v-data-table__expand-icon",class:{"v-data-table__expand-icon--active":n.isExpanded},on:{click:a=>{a.stopPropagation(),n.expand(!n.isExpanded)}}},[this.expandIcon])}return this.$createElement(this.isMobile?ht:rt,{key:p(t,this.itemKey),class:J({...s,"v-data-table__selected":n.isSelected},A(t,this.itemClass)),style:Q({},A(t,this.itemStyle)),props:{headers:this.computedHeaders,hideDefaultHeader:this.hideDefaultHeader,index:e,item:t,rtl:this.$vuetify.rtl},scopedSlots:i,on:n.on})},genBody(t){const e={...t,expand:this.expand,headers:this.computedHeaders,isExpanded:this.isExpanded,isMobile:this.isMobile,isSelected:this.isSelected,select:this.select};return this.$scopedSlots.body?this.$scopedSlots.body(e):this.$createElement("tbody",[m(this,"body.prepend",e,!0),this.genItems(t.items,t),m(this,"body.append",e,!0)])},genFoot(t){var e,s;return(s=(e=this.$scopedSlots).foot)===null||s===void 0?void 0:s.call(e,t)},genFooters(t){const e={props:{options:t.options,pagination:t.pagination,itemsPerPageText:"$vuetify.dataTable.itemsPerPageText",...this.sanitizedFooterProps},on:{"update:options":i=>t.updateOptions(i)},widths:this.widths,headers:this.computedHeaders},s=[m(this,"footer",e,!0)];return this.hideDefaultFooter||s.push(this.$createElement(j,{...e,scopedSlots:P("footer.",this.$scopedSlots)})),s},genDefaultScopedSlot(t){const e={height:this.height,fixedHeader:this.fixedHeader,dense:this.dense};return this.$createElement(lt,{props:e,class:{"v-data-table--mobile":this.isMobile,"v-data-table--selectable":this.showSelect}},[this.proxySlot("top",m(this,"top",{...t,isMobile:this.isMobile},!0)),this.genCaption(t),this.genColgroup(t),this.genHeaders(t),this.genBody(t),this.genFoot(t),this.proxySlot("bottom",this.genFooters(t))])},proxySlot(t,e){return this.$createElement("template",{slot:t},e)}},render(){return this.$createElement(E,{props:{...this.$props,customFilter:this.customFilterWithColumns,customSort:this.customSortWithHeaders,itemsPerPage:this.computedItemsPerPage},on:{"update:options":(t,e)=>{this.internalGroupBy=t.groupBy||[],!c(t,e)&&this.$emit("update:options",t)},"update:page":t=>this.$emit("update:page",t),"update:items-per-page":t=>this.$emit("update:items-per-page",t),"update:sort-by":t=>this.$emit("update:sort-by",t),"update:sort-desc":t=>this.$emit("update:sort-desc",t),"update:group-by":t=>this.$emit("update:group-by",t),"update:group-desc":t=>this.$emit("update:group-desc",t),pagination:(t,e)=>!c(t,e)&&this.$emit("pagination",t),"current-items":t=>{this.internalCurrentItems=t,this.$emit("current-items",t)},"page-count":t=>this.$emit("page-count",t)},scopedSlots:{default:this.genDefaultScopedSlot}})}});export{gt as _,lt as a};
