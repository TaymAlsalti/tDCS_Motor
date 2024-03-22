!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{enumerable:!0,get:getter})},__webpack_require__.r=function(exports){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.t=function(value,mode){if(1&mode&&(value=__webpack_require__(value)),8&mode)return value;if(4&mode&&"object"==typeof value&&value&&value.__esModule)return value;var ns=Object.create(null);if(__webpack_require__.r(ns),Object.defineProperty(ns,"default",{enumerable:!0,value:value}),2&mode&&"string"!=typeof value)for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module["default"]}:function getModuleExports(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=15)}([function(module,exports,__webpack_require__){"use strict";var __read=this&&this.__read||function(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var i=m.call(o),r,ar=[],e;try{for(;(void 0===n||n-->0)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error:error}}finally{try{r&&!r.done&&(m=i["return"])&&m.call(i)}finally{if(e)throw e.error}}return ar},__values=this&&this.__values||function(o){var s="function"==typeof Symbol&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&"number"==typeof o.length)return{next:function(){return o&&i>=o.length&&(o=void 0),{value:o&&o[i++],done:!o}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")},_a;Object.defineProperty(exports,"__esModule",{value:!0}),exports.clearDocument=exports.saveDocument=exports.makeBsprAttributes=exports.removeProperty=exports.getProperty=exports.setProperty=exports.balanceRules=void 0;var NodeUtil_js_1=__webpack_require__(10),ParseUtil_js_1=__webpack_require__(4),doc=null,item=null,getBBox=function(node){item.root=node;var width=doc.outputJax.getBBox(item,doc).w;return width},getRule=function(node){for(var i=0;node&&!NodeUtil_js_1["default"].isType(node,"mtable");){if(NodeUtil_js_1["default"].isType(node,"text"))return null;NodeUtil_js_1["default"].isType(node,"mrow")?(node=node.childNodes[0],i=0):(node=node.parent.childNodes[i],i++)}return node},getPremises=function(rule,direction){return rule.childNodes["up"===direction?1:0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]},getPremise=function(premises,n){return premises.childNodes[n].childNodes[0].childNodes[0]},firstPremise=function(premises){return getPremise(premises,0)},lastPremise=function(premises){return getPremise(premises,premises.childNodes.length-1)},getConclusion=function(rule,direction){return rule.childNodes["up"===direction?0:1].childNodes[0].childNodes[0].childNodes[0]},getColumn=function(inf){for(;inf&&!NodeUtil_js_1["default"].isType(inf,"mtd");)inf=inf.parent;return inf},nextSibling=function(inf){return inf.parent.childNodes[inf.parent.childNodes.indexOf(inf)+1]},previousSibling=function(inf){return inf.parent.childNodes[inf.parent.childNodes.indexOf(inf)-1]},getParentInf=function(inf){for(;inf&&null==exports.getProperty(inf,"inference");)inf=inf.parent;return inf},getSpaces=function(inf,rule,right){void 0===right&&(right=!1);var result=0;if(inf===rule)return result;if(inf!==rule.parent){var children_1=inf.childNodes,index_1=right?children_1.length-1:0;NodeUtil_js_1["default"].isType(children_1[index_1],"mspace")&&(result+=getBBox(children_1[index_1])),inf=rule.parent}if(inf===rule)return result;var children=inf.childNodes,index=right?children.length-1:0;return children[index]!==rule&&(result+=getBBox(children[index])),result},adjustValue=function(inf,right){void 0===right&&(right=!1);var rule=getRule(inf),conc=getConclusion(rule,exports.getProperty(rule,"inferenceRule")),w=getSpaces(inf,rule,right),x=getBBox(rule),y=getBBox(conc);return w+(x-y)/2},addSpace=function(config,inf,space,right){if(void 0===right&&(right=!1),exports.getProperty(inf,"inferenceRule")||exports.getProperty(inf,"labelledRule")){var mrow=config.nodeFactory.create("node","mrow");inf.parent.replaceChild(mrow,inf),mrow.setChildren([inf]),moveProperties(inf,mrow),inf=mrow}var index=right?inf.childNodes.length-1:0,mspace=inf.childNodes[index];return NodeUtil_js_1["default"].isType(mspace,"mspace")?void NodeUtil_js_1["default"].setAttribute(mspace,"width",ParseUtil_js_1["default"].Em(ParseUtil_js_1["default"].dimen2em(NodeUtil_js_1["default"].getAttribute(mspace,"width"))+space)):(mspace=config.nodeFactory.create("node","mspace",[],{width:ParseUtil_js_1["default"].Em(space)}),right?void inf.appendChild(mspace):(mspace.parent=inf,void inf.childNodes.unshift(mspace)))},moveProperties=function(src,dest){var props=["inference","proof","maxAdjust","labelledRule"];props.forEach(function(x){var value=exports.getProperty(src,x);null!=value&&(exports.setProperty(dest,x,value),exports.removeProperty(src,x))})},adjustSequents=function(config){var sequents=config.nodeLists.sequent;if(sequents)for(var i=sequents.length-1,seq=void 0;seq=sequents[i];i--)if(exports.getProperty(seq,"sequentProcessed"))exports.removeProperty(seq,"sequentProcessed");else{var collect=[],inf=getParentInf(seq);if(1===exports.getProperty(inf,"inference")){for(collect.push(seq);1===exports.getProperty(inf,"inference");){inf=getRule(inf);var premise=firstPremise(getPremises(inf,exports.getProperty(inf,"inferenceRule"))),sequent=exports.getProperty(premise,"inferenceRule")?getConclusion(premise,exports.getProperty(premise,"inferenceRule")):premise;exports.getProperty(sequent,"sequent")&&(seq=sequent.childNodes[0],collect.push(seq),exports.setProperty(seq,"sequentProcessed",!0)),inf=premise}adjustSequentPairwise(config,collect)}}},addSequentSpace=function(config,sequent,position,direction,width){var mspace=config.nodeFactory.create("node","mspace",[],{width:ParseUtil_js_1["default"].Em(width)});if("left"===direction){var row=sequent.childNodes[position].childNodes[0];mspace.parent=row,row.childNodes.unshift(mspace)}else sequent.childNodes[position].appendChild(mspace);exports.setProperty(sequent.parent,"sequentAdjust_"+direction,width)},adjustSequentPairwise=function(config,sequents){for(var top=sequents.pop();sequents.length;){var bottom=sequents.pop(),_a=__read(compareSequents(top,bottom),2),left=_a[0],right=_a[1];exports.getProperty(top.parent,"axiom")&&(addSequentSpace(config,0>left?top:bottom,0,"left",Math.abs(left)),addSequentSpace(config,0>right?top:bottom,2,"right",Math.abs(right))),top=bottom}},compareSequents=function(top,bottom){var tr=getBBox(top.childNodes[2]),br=getBBox(bottom.childNodes[2]),tl=getBBox(top.childNodes[0]),bl=getBBox(bottom.childNodes[0]),dl=tl-bl,dr=tr-br;return[dl,dr]};exports.balanceRules=function(arg){var e_1,_a;item=new arg.document.options.MathItem("",null,arg.math.display);var config=arg.data;adjustSequents(config);var inferences=config.nodeLists.inference||[];try{for(var inferences_1=__values(inferences),inferences_1_1=inferences_1.next();!inferences_1_1.done;inferences_1_1=inferences_1.next()){var inf=inferences_1_1.value,isProof=exports.getProperty(inf,"proof"),rule=getRule(inf),premises=getPremises(rule,exports.getProperty(rule,"inferenceRule")),premiseF=firstPremise(premises);if(exports.getProperty(premiseF,"inference")){var adjust_1=adjustValue(premiseF);if(adjust_1){addSpace(config,premiseF,-adjust_1);var w_1=getSpaces(inf,rule,!1);addSpace(config,inf,adjust_1-w_1)}}var premiseL=lastPremise(premises);if(null!=exports.getProperty(premiseL,"inference")){var adjust=adjustValue(premiseL,!0);addSpace(config,premiseL,-adjust,!0);var w=getSpaces(inf,rule,!0),maxAdjust=exports.getProperty(inf,"maxAdjust");null!=maxAdjust&&(adjust=Math.max(adjust,maxAdjust));var column=void 0;if(!isProof&&(column=getColumn(inf))){var sibling=nextSibling(column);if(sibling){var pos=config.nodeFactory.create("node","mspace",[],{width:adjust-w+"em"});sibling.appendChild(pos),inf.removeProperty("maxAdjust")}else{var parentRule=getParentInf(column);parentRule&&(adjust=exports.getProperty(parentRule,"maxAdjust")?Math.max(exports.getProperty(parentRule,"maxAdjust"),adjust):adjust,exports.setProperty(parentRule,"maxAdjust",adjust))}}else addSpace(config,exports.getProperty(inf,"proof")?inf:inf.parent,adjust-w,!0)}}}catch(e_1_1){e_1={error:e_1_1}}finally{try{inferences_1_1&&!inferences_1_1.done&&(_a=inferences_1["return"])&&_a.call(inferences_1)}finally{if(e_1)throw e_1.error}}};var property_prefix="bspr_",blacklistedProperties=(_a={},_a[property_prefix+"maxAdjust"]=!0,_a);exports.setProperty=function(node,property,value){NodeUtil_js_1["default"].setProperty(node,property_prefix+property,value)},exports.getProperty=function(node,property){return NodeUtil_js_1["default"].getProperty(node,property_prefix+property)},exports.removeProperty=function(node,property){node.removeProperty(property_prefix+property)},exports.makeBsprAttributes=function(arg){arg.data.root.walkTree(function(mml,_data){var attr=[];mml.getPropertyNames().forEach(function(x){!blacklistedProperties[x]&&x.match(RegExp("^"+property_prefix))&&attr.push(x+":"+mml.getProperty(x))}),attr.length&&NodeUtil_js_1["default"].setAttribute(mml,"semantics",attr.join(";"))})},exports.saveDocument=function(arg){if(doc=arg.document,!("getBBox"in doc.outputJax))throw Error("The bussproofs extension requires an output jax with a getBBox() method")},exports.clearDocument=function(_arg){doc=null}},function(module,exports,__webpack_require__){"use strict";var __extends=this&&this.__extends||function(){var extendStatics=function(d,b){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])})(d,b)};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.ProofTreeItem=void 0;var TexError_js_1=__webpack_require__(3),StackItem_js_1=__webpack_require__(8),Stack_js_1=__webpack_require__(9),BussproofsUtil=__webpack_require__(0),ProofTreeItem=function(_super){function ProofTreeItem(){var _this=null!==_super&&_super.apply(this,arguments)||this;return _this.leftLabel=null,_this.rigthLabel=null,_this.innerStack=new Stack_js_1["default"](_this.factory,{},!0),_this}return __extends(ProofTreeItem,_super),Object.defineProperty(ProofTreeItem.prototype,"kind",{get:function(){return"proofTree"},enumerable:!1,configurable:!0}),ProofTreeItem.prototype.checkItem=function(item){if(item.isKind("end")&&"prooftree"===item.getName()){var node=this.toMml();return BussproofsUtil.setProperty(node,"proof",!0),[[this.factory.create("mml",node),item],!0]}if(item.isKind("stop"))throw new TexError_js_1["default"]("EnvMissingEnd","Missing \\end{%1}",this.getName());return this.innerStack.Push(item),StackItem_js_1.BaseItem.fail},ProofTreeItem.prototype.toMml=function(){var tree=_super.prototype.toMml.call(this),start=this.innerStack.Top();if(start.isKind("start")&&!start.Size())return tree;this.innerStack.Push(this.factory.create("stop"));var prefix=this.innerStack.Top().toMml();return this.create("node","mrow",[prefix,tree],{})},ProofTreeItem}(StackItem_js_1.BaseItem);exports.ProofTreeItem=ProofTreeItem},function(module,exports,__webpack_require__){"use strict";function createRule(parser,premise,conclusions,left,right,style,rootAtTop){var upper=parser.create("node","mtr",[parser.create("node","mtd",[premise],{})],{}),lower=parser.create("node","mtr",[parser.create("node","mtd",conclusions,{})],{}),rule=parser.create("node","mtable",rootAtTop?[lower,upper]:[upper,lower],{align:"top 2",rowlines:style,framespacing:"0 0"});BussproofsUtil.setProperty(rule,"inferenceRule",rootAtTop?"up":"down");var leftLabel,rightLabel;left&&(leftLabel=parser.create("node","mpadded",[left],{height:"+.5em",width:"+.5em",voffset:"-.15em"}),BussproofsUtil.setProperty(leftLabel,"prooflabel","left")),right&&(rightLabel=parser.create("node","mpadded",[right],{height:"+.5em",width:"+.5em",voffset:"-.15em"}),BussproofsUtil.setProperty(rightLabel,"prooflabel","right"));var children,label;if(left&&right)children=[leftLabel,rule,rightLabel],label="both";else if(left)children=[leftLabel,rule],label="left";else{if(!right)return rule;children=[rule,rightLabel],label="right"}return rule=parser.create("node","mrow",children),BussproofsUtil.setProperty(rule,"labelledRule",label),rule}function parseFCenterLine(parser,name){var dollar=parser.GetNext();if("$"!==dollar)throw new TexError_js_1["default"]("IllegalUseOfCommand","Use of %1 does not match it's definition.",name);parser.i++;var axiom=parser.GetUpTo(name,"$");if(-1===axiom.indexOf("\\fCenter"))throw new TexError_js_1["default"]("IllegalUseOfCommand","Missing \\fCenter in %1.",name);var _a=__read(axiom.split("\\fCenter"),2),prem=_a[0],conc=_a[1],premise=new TexParser_js_1["default"](prem,parser.stack.env,parser.configuration).mml(),conclusion=new TexParser_js_1["default"](conc,parser.stack.env,parser.configuration).mml(),fcenter=new TexParser_js_1["default"]("\\fCenter",parser.stack.env,parser.configuration).mml(),left=parser.create("node","mtd",[premise],{}),middle=parser.create("node","mtd",[fcenter],{}),right=parser.create("node","mtd",[conclusion],{}),row=parser.create("node","mtr",[left,middle,right],{}),table=parser.create("node","mtable",[row],{columnspacing:".5ex",columnalign:"center 2"});return BussproofsUtil.setProperty(table,"sequent",!0),parser.configuration.addNode("sequent",row),table}var __read=this&&this.__read||function(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var i=m.call(o),r,ar=[],e;try{for(;(void 0===n||n-->0)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error:error}}finally{try{r&&!r.done&&(m=i["return"])&&m.call(i)}finally{if(e)throw e.error}}return ar},__spread=this&&this.__spread||function(){for(var ar=[],i=0;i<arguments.length;i++)ar=ar.concat(__read(arguments[i]));return ar};Object.defineProperty(exports,"__esModule",{value:!0});var TexError_js_1=__webpack_require__(3),TexParser_js_1=__webpack_require__(12),ParseUtil_js_1=__webpack_require__(4),BussproofsUtil=__webpack_require__(0),BussproofsMethods={};BussproofsMethods.Prooftree=function(parser,begin){parser.Push(begin);var newItem=parser.itemFactory.create("proofTree").setProperties({name:begin.getName(),line:"solid",currentLine:"solid",rootAtTop:!1});return newItem},BussproofsMethods.Axiom=function(parser,name){var top=parser.stack.Top();if("proofTree"!==top.kind)throw new TexError_js_1["default"]("IllegalProofCommand","Proof commands only allowed in prooftree environment.");var content=paddedContent(parser,parser.GetArgument(name));BussproofsUtil.setProperty(content,"axiom",!0),top.Push(content)};var paddedContent=function(parser,content){var nodes=ParseUtil_js_1["default"].internalMath(parser,ParseUtil_js_1["default"].trimSpaces(content),0);if(!nodes[0].childNodes[0].childNodes.length)return parser.create("node","mrow",[]);var lpad=parser.create("node","mspace",[],{width:".5ex"}),rpad=parser.create("node","mspace",[],{width:".5ex"});return parser.create("node","mrow",__spread([lpad],nodes,[rpad]))};BussproofsMethods.Inference=function(parser,name,n){var top=parser.stack.Top();if("proofTree"!==top.kind)throw new TexError_js_1["default"]("IllegalProofCommand","Proof commands only allowed in prooftree environment.");if(top.Size()<n)throw new TexError_js_1["default"]("BadProofTree","Proof tree badly specified.");var rootAtTop=top.getProperty("rootAtTop"),childCount=1!==n||top.Peek()[0].childNodes.length?n:0,children=[];do children.length&&children.unshift(parser.create("node","mtd",[],{})),children.unshift(parser.create("node","mtd",[top.Pop()],{rowalign:rootAtTop?"top":"bottom"})),n--;while(n>0);var row=parser.create("node","mtr",children,{}),table=parser.create("node","mtable",[row],{framespacing:"0 0"}),conclusion=paddedContent(parser,parser.GetArgument(name)),style=top.getProperty("currentLine");style!==top.getProperty("line")&&top.setProperty("currentLine",top.getProperty("line"));var rule=createRule(parser,table,[conclusion],top.getProperty("left"),top.getProperty("right"),style,rootAtTop);top.setProperty("left",null),top.setProperty("right",null),BussproofsUtil.setProperty(rule,"inference",childCount),parser.configuration.addNode("inference",rule),top.Push(rule)},BussproofsMethods.Label=function(parser,name,side){var top=parser.stack.Top();if("proofTree"!==top.kind)throw new TexError_js_1["default"]("IllegalProofCommand","Proof commands only allowed in prooftree environment.");var content=ParseUtil_js_1["default"].internalMath(parser,parser.GetArgument(name),0),label=content.length>1?parser.create("node","mrow",content,{}):content[0];top.setProperty(side,label)},BussproofsMethods.SetLine=function(parser,_name,style,always){var top=parser.stack.Top();if("proofTree"!==top.kind)throw new TexError_js_1["default"]("IllegalProofCommand","Proof commands only allowed in prooftree environment.");top.setProperty("currentLine",style),always&&top.setProperty("line",style)},BussproofsMethods.RootAtTop=function(parser,_name,where){var top=parser.stack.Top();if("proofTree"!==top.kind)throw new TexError_js_1["default"]("IllegalProofCommand","Proof commands only allowed in prooftree environment.");top.setProperty("rootAtTop",where)},BussproofsMethods.AxiomF=function(parser,name){var top=parser.stack.Top();if("proofTree"!==top.kind)throw new TexError_js_1["default"]("IllegalProofCommand","Proof commands only allowed in prooftree environment.");var line=parseFCenterLine(parser,name);BussproofsUtil.setProperty(line,"axiom",!0),top.Push(line)},BussproofsMethods.FCenter=function(_parser,_name){},BussproofsMethods.InferenceF=function(parser,name,n){var top=parser.stack.Top();if("proofTree"!==top.kind)throw new TexError_js_1["default"]("IllegalProofCommand","Proof commands only allowed in prooftree environment.");if(top.Size()<n)throw new TexError_js_1["default"]("BadProofTree","Proof tree badly specified.");var rootAtTop=top.getProperty("rootAtTop"),childCount=1!==n||top.Peek()[0].childNodes.length?n:0,children=[];do children.length&&children.unshift(parser.create("node","mtd",[],{})),children.unshift(parser.create("node","mtd",[top.Pop()],{rowalign:rootAtTop?"top":"bottom"})),n--;while(n>0);var row=parser.create("node","mtr",children,{}),table=parser.create("node","mtable",[row],{framespacing:"0 0"}),conclusion=parseFCenterLine(parser,name),style=top.getProperty("currentLine");style!==top.getProperty("line")&&top.setProperty("currentLine",top.getProperty("line"));var rule=createRule(parser,table,[conclusion],top.getProperty("left"),top.getProperty("right"),style,rootAtTop);top.setProperty("left",null),top.setProperty("right",null),BussproofsUtil.setProperty(rule,"inference",childCount),parser.configuration.addNode("inference",rule),top.Push(rule)},exports["default"]=BussproofsMethods},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=MathJax._.input.tex.TexError["default"]},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=MathJax._.input.tex.ParseUtil["default"]},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.isObject=MathJax._.components.global.isObject,exports.combineConfig=MathJax._.components.global.combineConfig,exports.combineDefaults=MathJax._.components.global.combineDefaults,exports.combineWithMathJax=MathJax._.components.global.combineWithMathJax,exports.MathJax=MathJax._.components.global.MathJax},function(module,exports,__webpack_require__){"use strict";var _a;Object.defineProperty(exports,"__esModule",{value:!0}),exports.BussproofsConfiguration=void 0;var Configuration_js_1=__webpack_require__(7),BussproofsItems_js_1=__webpack_require__(1),BussproofsUtil_js_1=__webpack_require__(0);__webpack_require__(11),exports.BussproofsConfiguration=Configuration_js_1.Configuration.create("bussproofs",{handler:{macro:["Bussproofs-macros"],environment:["Bussproofs-environments"]},items:(_a={},_a[BussproofsItems_js_1.ProofTreeItem.prototype.kind]=BussproofsItems_js_1.ProofTreeItem,_a),preprocessors:[[BussproofsUtil_js_1.saveDocument,1]],postprocessors:[[BussproofsUtil_js_1.clearDocument,3],[BussproofsUtil_js_1.makeBsprAttributes,2],[BussproofsUtil_js_1.balanceRules,1]]})},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Configuration=MathJax._.input.tex.Configuration.Configuration,exports.ConfigurationHandler=MathJax._.input.tex.Configuration.ConfigurationHandler,exports.ParserConfiguration=MathJax._.input.tex.Configuration.ParserConfiguration},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MmlStack=MathJax._.input.tex.StackItem.MmlStack,exports.BaseItem=MathJax._.input.tex.StackItem.BaseItem},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=MathJax._.input.tex.Stack["default"]},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=MathJax._.input.tex.NodeUtil["default"]},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var BussproofsMethods_js_1=__webpack_require__(2),ParseMethods_js_1=__webpack_require__(13),SymbolMap_js_1=__webpack_require__(14);new SymbolMap_js_1.CommandMap("Bussproofs-macros",{AxiomC:"Axiom",UnaryInfC:["Inference",1],BinaryInfC:["Inference",2],TrinaryInfC:["Inference",3],QuaternaryInfC:["Inference",4],QuinaryInfC:["Inference",5],RightLabel:["Label","right"],LeftLabel:["Label","left"],AXC:"Axiom",UIC:["Inference",1],BIC:["Inference",2],TIC:["Inference",3],RL:["Label","right"],LL:["Label","left"],noLine:["SetLine","none",!1],singleLine:["SetLine","solid",!1],solidLine:["SetLine","solid",!1],dashedLine:["SetLine","dashed",!1],alwaysNoLine:["SetLine","none",!0],alwaysSingleLine:["SetLine","solid",!0],alwaysSolidLine:["SetLine","solid",!0],alwaysDashedLine:["SetLine","dashed",!0],rootAtTop:["RootAtTop",!0],alwaysRootAtTop:["RootAtTop",!0],rootAtBottom:["RootAtTop",!1],alwaysRootAtBottom:["RootAtTop",!1],fCenter:"FCenter",Axiom:"AxiomF",UnaryInf:["InferenceF",1],BinaryInf:["InferenceF",2],TrinaryInf:["InferenceF",3],QuaternaryInf:["InferenceF",4],QuinaryInf:["InferenceF",5]},BussproofsMethods_js_1["default"]),new SymbolMap_js_1.EnvironmentMap("Bussproofs-environments",ParseMethods_js_1["default"].environment,{prooftree:["Prooftree",null,!1]},BussproofsMethods_js_1["default"])},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=MathJax._.input.tex.TexParser["default"]},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=MathJax._.input.tex.ParseMethods["default"]},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AbstractSymbolMap=MathJax._.input.tex.SymbolMap.AbstractSymbolMap,exports.RegExpMap=MathJax._.input.tex.SymbolMap.RegExpMap,exports.AbstractParseMap=MathJax._.input.tex.SymbolMap.AbstractParseMap,exports.CharacterMap=MathJax._.input.tex.SymbolMap.CharacterMap,exports.DelimiterMap=MathJax._.input.tex.SymbolMap.DelimiterMap,exports.MacroMap=MathJax._.input.tex.SymbolMap.MacroMap,exports.CommandMap=MathJax._.input.tex.SymbolMap.CommandMap,exports.EnvironmentMap=MathJax._.input.tex.SymbolMap.EnvironmentMap},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var global=__webpack_require__(5),BussproofsConfiguration=__webpack_require__(6),BussproofsItems=__webpack_require__(1),BussproofsMethods=__webpack_require__(2),BussproofsUtil=__webpack_require__(0);Object(global.combineWithMathJax)({_:{input:{tex:{bussproofs:{BussproofsConfiguration:BussproofsConfiguration,BussproofsItems:BussproofsItems,BussproofsMethods:BussproofsMethods,BussproofsUtil:BussproofsUtil}}}}})}]);
