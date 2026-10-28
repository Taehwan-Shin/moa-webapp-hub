import {test} from 'node:test';
import assert from 'node:assert/strict';
import {numbers, shuffle, makeGroups, safeURL} from '../dist/core.mjs';
test('excluded numbers are never selected',()=>assert.deepEqual(numbers(5,'2, 4'),[1,3,5]));
test('invalid and excessive inputs are rejected',()=>{for(const n of [0,501,2.5,NaN]) assert.throws(()=>numbers(n,'')); assert.throws(()=>numbers(5,'6')); assert.throws(()=>numbers(5,'x'));});
test('shuffle preserves every number without duplicates',()=>{const a=numbers(30,'');assert.deepEqual(shuffle(a).sort((a,b)=>a-b),a);});
test('balanced groups preserve all participants',()=>{const a=numbers(31,'4');const g=makeGroups(a,7);assert.equal(g.length,7);assert.ok(Math.max(...g.map(x=>x.length))-Math.min(...g.map(x=>x.length))<=1);assert.deepEqual(g.flat().sort((a,b)=>a-b),a);assert.throws(()=>makeGroups(a,0));assert.throws(()=>makeGroups(a,31));});
test('URL validation blocks active content, credentials and private networks',()=>{for(const s of ['javascript:alert(1)','data:text/html,hi','http://example.com','https://u:p@example.com','https://127.0.0.1','https://localhost','https://192.168.1.1','https://[::1]'])assert.throws(()=>safeURL(s));assert.equal(safeURL('https://example.com/app'),'https://example.com/app');});
test('URL validation rejects common credential parameters',()=>{for(const s of ['https://example.com/?access_token=synthetic','https://example.com/#id_token=synthetic','https://example.com/?api_key=synthetic','https://example.com/?password=synthetic'])assert.throws(()=>safeURL(s));assert.equal(safeURL('https://example.com/#/diary'),'https://example.com/#/diary');});
