
var createStackTextModule=(()=>{var _scriptName=globalThis.document?.currentScript?.src;return async function(moduleArg={}){var Module=moduleArg;var ENVIRONMENT_IS_WEB=!!globalThis.window;var ENVIRONMENT_IS_WORKER=!!globalThis.WorkerGlobalScope;var ENVIRONMENT_IS_NODE=globalThis.process?.versions?.node&&globalThis.process?.type!="renderer";if(typeof __filename!=="undefined")_scriptName=__filename;else if(ENVIRONMENT_IS_WORKER)_scriptName=self.location.href;var scriptDirectory="";function locateFile(path){if(Module["locateFile"])return Module["locateFile"](path,scriptDirectory);return scriptDirectory+path}var readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("node:fs");scriptDirectory=__dirname+"/";readBinary=filename=>{filename=isFileURI(filename)?new URL(filename):filename;var ret=fs.readFileSync(filename);return ret};readAsync=async(filename,binary=true)=>{filename=isFileURI(filename)?new URL(filename):filename;var ret=fs.readFileSync(filename,binary?void 0:"utf8");return ret};if(process.argv.length>1)process.argv[1].replace(/\\/g,"/");process.argv.slice(2);0}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){try{scriptDirectory=new URL(".",_scriptName).href}catch{}if(ENVIRONMENT_IS_WORKER)readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)};readAsync=async url=>{if(isFileURI(url))return new Promise((resolve,reject)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){resolve(xhr.response);return}reject(xhr.status)};xhr.onerror=reject;xhr.send(null)});var response=await fetch(url,{credentials:"same-origin"});if(response.ok)return response.arrayBuffer();throw new Error(response.status+" : "+response.url)}}console.log.bind(console);var err=console.error.bind(console);var ABORT=false;var isFileURI=filename=>filename.startsWith("file://");function getMemoryBuffer(){return wasmMemory.buffer}function updateMemoryViews(){if(HEAP8?.buffer?.resizable)return;var b=getMemoryBuffer();HEAP8=new Int8Array(b);HEAPU8=new Uint8Array(b)}function preRun(){var preRun=Module["preRun"];if(preRun){if(typeof preRun==="function")preRun=[preRun];onPreRuns.push(...preRun)}callRuntimeCallbacks(onPreRuns)}function initRuntime(){0;wasmExports["__wasm_call_ctors"]()}function postRun(){var postRun=Module["postRun"];if(postRun){if(typeof postRun==="function")postRun=[postRun];onPostRuns.push(...postRun)}callRuntimeCallbacks(onPostRuns)}function abort(what){Module["onAbort"]?.(what);what=`Aborted(${what})`;err(what);ABORT=true;what+=". Build with -sASSERTIONS for more info.";throw new WebAssembly.RuntimeError(what)}var wasmBinaryFile;function findWasmBinary(){return locateFile("stacktext.wasm")}function getBinarySync(file){if(readBinary)return readBinary(file);throw"both async and sync fetching of the wasm failed"}async function getWasmBinary(binaryFile){if(true)try{return await readAsync(binaryFile)}catch{}return getBinarySync(binaryFile)}async function instantiateArrayBuffer(binaryFile,imports){try{var binary=await getWasmBinary(binaryFile);var instance=await WebAssembly.instantiate(binary,imports);return instance}catch(reason){err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)}}async function instantiateAsync(binary,binaryFile,imports){if(!binary&&!isFileURI(binaryFile)&&!ENVIRONMENT_IS_NODE)try{var response=fetch(binaryFile,{credentials:"same-origin"});var instantiationResult=await WebAssembly.instantiateStreaming(response,imports);return instantiationResult}catch(reason){err(`wasm streaming compile failed: ${reason}`);err("falling back to ArrayBuffer instantiation")}return instantiateArrayBuffer(binaryFile,imports)}function getWasmImports(){var imports={env:wasmImports,wasi_snapshot_preview1:wasmImports};return imports}var HEAP8;var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0)callbacks.shift()(Module)};var onPostRuns=[];var onPreRuns=[];var stackRestore=val=>__emscripten_stack_restore(val);var stackSave=()=>_emscripten_stack_get_current();var HEAPU8;var UTF8Decoder=globalThis.TextDecoder&&new TextDecoder;var findStringEnd=(heapOrArray,idx,maxBytesToRead,ignoreNul)=>{var maxIdx=idx+maxBytesToRead;if(ignoreNul)return maxIdx;while(heapOrArray[idx]&&!(idx>=maxIdx))++idx;return idx};var UTF8ArrayToString=(heapOrArray,idx=0,maxBytesToRead,ignoreNul)=>{var endPtr=findStringEnd(heapOrArray,idx,maxBytesToRead,ignoreNul);if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder)return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr));var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224)u0=(u0&15)<<12|u1<<6|u2;else u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63;if(u0<65536)str+=String.fromCharCode(u0);else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead,ignoreNul)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead,ignoreNul):"";var getCFunc=ident=>{var func=Module["_"+ident];return func};var stackAlloc=sz=>__emscripten_stack_alloc(sz);var lengthBytesUTF8=str=>{var len=0;for(var i=0;i<str.length;++i){var u=str.codePointAt(i);if(u<=127)len++;else if(u<=2047)len+=2;else if(u<=65535)len+=3;else{len+=4;i++}}return len};var stringToUTF8Array=(str,heap,outIdx,maxBytesToWrite)=>{if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.codePointAt(i);if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63;i++}}heap[outIdx]=0;return outIdx-startIdx};var stringToUTF8=(str,outPtr,maxBytesToWrite)=>stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite);var stringToUTF8OnStack=str=>{var size=lengthBytesUTF8(str)+1;var ret=stackAlloc(size);stringToUTF8(str,ret,size);return ret};var writeArrayToMemory=(array,buffer)=>{HEAP8.set(array,buffer)};var ccall=(ident,returnType,argTypes,args)=>{var toC={string:str=>{var ret=0;if(str!==null&&str!==void 0&&str!==0)ret=stringToUTF8OnStack(str);return ret},array:arr=>{var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}};function convertReturnValue(ret){if(returnType==="string")return UTF8ToString(ret);if(returnType==="boolean")return Boolean(ret);return ret}var func=getCFunc(ident);var cArgs=[];var stack=0;if(args)for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(!stack)stack=stackSave();cArgs[i]=converter(args[i])}else cArgs[i]=args[i]}var ret=func(...cArgs);ret=function(ret){if(stack)stackRestore(stack);return convertReturnValue(ret)}(ret);return ret};if(Module["noExitRuntime"])Module["noExitRuntime"];if(Module["print"])Module["print"];if(Module["printErr"])err=Module["printErr"];if(Module["arguments"])Module["arguments"];if(Module["thisProgram"])Module["thisProgram"];var preInit=Module["preInit"];if(preInit){if(typeof preInit==="function")Module["preInit"]=preInit=[preInit];while(preInit.length>0)preInit.shift()()}Module["ccall"]=ccall;Module["cwrap"]=(ident,returnType,argTypes,opts)=>{var numericArgs=!argTypes||argTypes.every(type=>type==="number"||type==="boolean");var numericRet=returnType!=="string";if(numericRet&&numericArgs&&!opts)return getCFunc(ident);return(...args)=>ccall(ident,returnType,argTypes,args)};var __emscripten_stack_restore,__emscripten_stack_alloc,_emscripten_stack_get_current,wasmMemory;function assignWasmExports(wasmExports){Module["_editor_init"]=wasmExports["editor_init"];Module["_editor_get_text"]=wasmExports["editor_get_text"];Module["_editor_set_text"]=wasmExports["editor_set_text"];Module["_editor_undo"]=wasmExports["editor_undo"];Module["_editor_redo"]=wasmExports["editor_redo"];Module["_editor_undo_count"]=wasmExports["editor_undo_count"];Module["_editor_redo_count"]=wasmExports["editor_redo_count"];Module["_editor_get_undo_item"]=wasmExports["editor_get_undo_item"];Module["_editor_get_redo_item"]=wasmExports["editor_get_redo_item"];wasmExports["setThrew"];__emscripten_stack_restore=wasmExports["_emscripten_stack_restore"];__emscripten_stack_alloc=wasmExports["_emscripten_stack_alloc"];_emscripten_stack_get_current=wasmExports["emscripten_stack_get_current"];wasmMemory=wasmExports["memory"];wasmExports["__indirect_function_table"]}var wasmImports={};var wasmExports;wasmExports=await async function(){function receiveInstance(instance){wasmExports=instance.exports;assignWasmExports(wasmExports);updateMemoryViews();return wasmExports}var info=getWasmImports();var instantiateWasm=Module["instantiateWasm"];if(instantiateWasm)return new Promise(resolve=>{instantiateWasm(info,inst=>resolve(receiveInstance(inst)))});wasmBinaryFile??=findWasmBinary();var result=await instantiateAsync(void 0,wasmBinaryFile,info);var exports=function(result){return receiveInstance(result["instance"])}(result);return exports}();await async function(){preRun();var setStatus=Module["setStatus"];if(setStatus){setStatus("Running...");await new Promise(resolve=>setTimeout(resolve,1));setTimeout(setStatus,1,"")}if(ABORT)return;initRuntime();Module["onRuntimeInitialized"]?.();postRun()}();
;return Module}})();if(typeof exports==="object"&&typeof module==="object"){module.exports=createStackTextModule;module.exports.default=createStackTextModule}else if(typeof define==="function"&&define["amd"])define([],()=>createStackTextModule);

// ==========================================
// STACKTEXT - TEXT EDITOR
// C + WEBASSEMBLY INTEGRATION
// ==========================================

// Get HTML elements
const editor = document.getElementById("editor");

const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");

const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");
const clearBtn = document.getElementById("clearBtn");
const downloadBtn = document.getElementById("downloadBtn");

const undoHistory = document.getElementById("undoHistory");
const redoHistory = document.getElementById("redoHistory");


// ==========================================
// WEBASSEMBLY INITIALIZATION
// ==========================================

let wasmModule;

let setText;
let getText;
let undo;
let redo;
let undoCount;
let redoCount;
let getUndoItem;
let getRedoItem;

let typingTimer;


// Initialize WebAssembly module
async function initializeEditor() {

    try {

        wasmModule = await createStackTextModule();

        // Connect JavaScript to C functions
        setText = wasmModule.cwrap(
            "editor_set_text", null, ["string"]
        );

        getText = wasmModule.cwrap(
            "editor_get_text", "string", []
        );

        undo = wasmModule.cwrap(
            "editor_undo", null, []
        );

        redo = wasmModule.cwrap(
            "editor_redo", null, []
        );

        undoCount = wasmModule.cwrap(
            "editor_undo_count", "number", []
        );

        redoCount = wasmModule.cwrap(
            "editor_redo_count", "number", []
        );

        getUndoItem = wasmModule.cwrap(
            "editor_get_undo_item", "string", ["number"]
        );

        getRedoItem = wasmModule.cwrap(
            "editor_get_redo_item", "string", ["number"]
        );

        // Initialize C editor
        wasmModule._editor_init();

        updateStatistics();
        updateHistory();

        console.log("StackText initialized successfully!");

    } catch (error) {

        console.error("WebAssembly initialization failed:", error);

    }

}


// ==========================================
// EDITOR INPUT
// ==========================================

// Handle typing in editor
editor.addEventListener("input", function () {

    clearTimeout(typingTimer);

    typingTimer = setTimeout(function () {

        setText(editor.value);

        updateStatistics();
        updateHistory();

    }, 500);

});


// ==========================================
// WORD AND CHARACTER COUNTER
// ==========================================

function updateStatistics() {

    const text = editor.value;

    const characters = text.length;

    const words = text.trim() === ""
        ? 0
        : text.trim().split(/\s+/).length;

    if (wordCount) {
        wordCount.textContent = words;
    }

    if (charCount) {
        charCount.textContent = characters;
    }

}


// ==========================================
// UNDO OPERATION
// ==========================================

undoBtn.addEventListener("click", function () {

    clearTimeout(typingTimer);

    setText(editor.value);

    undo();

    editor.value = getText();

    updateStatistics();
    updateHistory();

});


// ==========================================
// REDO OPERATION
// ==========================================

redoBtn.addEventListener("click", function () {

    clearTimeout(typingTimer);

    setText(editor.value);

    redo();

    editor.value = getText();

    updateStatistics();
    updateHistory();

});


// ==========================================
// CLEAR OPERATION
// ==========================================

clearBtn.addEventListener("click", function () {

    clearTimeout(typingTimer);

    setText(editor.value);

    editor.value = "";

    setText("");

    updateStatistics();
    updateHistory();

});


// ==========================================
// HISTORY MANAGEMENT
// ==========================================

function updateHistory() {

    if (!wasmModule) return;

    // Update Undo history
    undoHistory.innerHTML = "";

    const undoTotal = undoCount();

    if (undoTotal === 0) {

        undoHistory.innerHTML =
            '<p class="empty-message">No undo history yet</p>';

    } else {

        for (let i = 0; i < undoTotal; i++) {

            const item = document.createElement("p");

            item.textContent = getUndoItem(i);

            undoHistory.appendChild(item);

        }

    }


    // Update Redo history
    redoHistory.innerHTML = "";

    const redoTotal = redoCount();

    if (redoTotal === 0) {

        redoHistory.innerHTML =
            '<p class="empty-message">No redo history yet</p>';

    } else {

        for (let i = 0; i < redoTotal; i++) {

            const item = document.createElement("p");

            item.textContent = getRedoItem(i);

            redoHistory.appendChild(item);

        }

    }

}


// ==========================================
// DOWNLOAD DOCUMENT
// ==========================================

downloadBtn.addEventListener("click", function () {

    const text = editor.value;

    const blob = new Blob(
        [text],
        { type: "text/plain" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "StackText_Document.txt";

    link.click();

    URL.revokeObjectURL(url);

});


// ==========================================
// INITIALIZE APPLICATION
// ==========================================

initializeEditor();
