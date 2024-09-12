import{bP as n,a1 as a,bQ as u,X as l}from"./index-ffe23009.js";import{V as o}from"./vue-b220ace6.js";const h=o.extend({name:"rippleable",directives:{ripple:n},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple(e={}){return this.ripple?(e.staticClass="v-input--selection-controls__ripple",e.directives=e.directives||[],e.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",e)):null}}});function s(e){e.preventDefault()}const d=a(l,h,u).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple(){return this.multiple===!0||this.multiple===null&&Array.isArray(this.internalValue)},isActive(){const e=this.value,t=this.internalValue;return this.isMultiple?Array.isArray(t)?t.some(i=>this.valueComparator(i,e)):!1:this.trueValue===void 0||this.falseValue===void 0?e?this.valueComparator(e,t):!!t:this.valueComparator(t,this.trueValue)},isDirty(){return this.isActive},rippleState(){return!this.isDisabled&&!this.validationState?void 0:this.validationState}},watch:{inputValue(e){this.lazyValue=e,this.hasColor=e}},methods:{genLabel(){const e=l.options.methods.genLabel.call(this);return e&&(e.data.on={click:s},e)},genInput(e,t){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:e,type:e},t),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:s},ref:"input"})},onClick(e){this.onChange(),this.$emit("click",e)},onChange(){if(!this.isInteractive)return;const e=this.value;let t=this.internalValue;if(this.isMultiple){Array.isArray(t)||(t=[]);const i=t.length;t=t.filter(r=>!this.valueComparator(r,e)),t.length===i&&t.push(e)}else this.trueValue!==void 0&&this.falseValue!==void 0?t=this.valueComparator(t,this.trueValue)?this.falseValue:this.trueValue:e?t=this.valueComparator(t,e)?null:e:t=!t;this.validate(!0,t),this.internalValue=t,this.hasColor=t},onFocus(e){this.isFocused=!0,this.$emit("focus",e)},onBlur(e){this.isFocused=!1,this.$emit("blur",e)},onKeydown(e){}}});export{d as S};
