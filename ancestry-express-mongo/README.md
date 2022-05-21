# 5.15.2022 error after sending 400K of data to process

[nodemon] starting `./node_modules/.bin/babel-node app.js`
Listening on port 3333
File processed.
[nodemon] restarting due to changes...
[nodemon] starting `./node_modules/.bin/babel-node app.js`
Listening on port 3333
File processed.
[nodemon] restarting due to changes...
[nodemon] starting `./node_modules/.bin/babel-node app.js`
Listening on port 3333
627fbd71551e224f97fe1218
627fbd71551e224f97fe1218

<--- Last few GCs --->

[12948:00000264381F2470]   138364 ms: Mark-sweep 2023.2 (2092.2) -> 2008.5 (2092.4) MB, 1282.5 / 0.4 ms  (average mu = 0.324, current mu = 0.292) task scavenge 
might not succeed
[12948:00000264381F2470]   140172 ms: Mark-sweep 2023.8 (2092.7) -> 2009.0 (2092.7) MB, 1258.4 / 0.4 ms  (average mu = 0.314, current mu = 0.304) task scavenge 
might not succeed


<--- JS stacktrace --->

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
 1: 00007FF636BA815F v8::internal::CodeObjectRegistry::~CodeObjectRegistry+114079
 2: 00007FF636B354C6 DSA_meth_get_flags+65542
 3: 00007FF636B3637D node::OnFatalError+301
 4: 00007FF63746BA0E v8::Isolate::ReportExternalAllocationLimitReached+94
 5: 00007FF637455FED v8::SharedArrayBuffer::Externalize+781
 6: 00007FF6372F93BC v8::internal::Heap::EphemeronKeyWriteBarrierFromCode+1468
 7: 00007FF637306069 v8::internal::Heap::PublishPendingAllocations+1129
 8: 00007FF63730303A v8::internal::Heap::PageFlagsAreConsistent+2842
 9: 00007FF6372F5C99 v8::internal::Heap::CollectGarbage+2137
10: 00007FF6372A6205 v8::internal::IndexGenerator::~IndexGenerator+22165
11: 00007FF636AC6F0F std::basic_ostream<char,std::char_traits<char> >::operator<<+80079
12: 00007FF636AC5726 std::basic_ostream<char,std::char_traits<char> >::operator<<+73958
13: 00007FF636C0766B uv_async_send+331
14: 00007FF636C06DFC uv_loop_init+1292
15: 00007FF636C06F9A uv_run+202
16: 00007FF636BD5E05 node::SpinEventLoop+309
17: 00007FF636AEDD13 v8::internal::Isolate::stack_guard+53827
18: 00007FF636B6B38C node::Start+220
19: 00007FF63698894C RC4_options+348236
20: 00007FF6379F05D8 v8::internal::compiler::RepresentationChanger::Uint32OverflowOperatorFor+14472
21: 00007FFE8EF37034 BaseThreadInitThunk+20
22: 00007FFE90F22651 RtlUserThreadStart+33
[nodemon] app crashed - waiting for file changes before starting...


# second error after commenting out line with openReader for test file

[nodemon] app crashed - waiting for file changes before starting...
[nodemon] restarting due to changes...
[nodemon] starting `./node_modules/.bin/babel-node app.js`
Listening on port 3333

<--- Last few GCs --->

[10924:000001C9DE4FDA90]    94131 ms: Scavenge 2021.2 (2086.2) -> 2016.9 (2086.2) MB, 5.1 / 0.2 ms  (average mu = 0.616, current mu = 0.650) task 
[10924:000001C9DE4FDA90]    94181 ms: Scavenge 2023.2 (2086.2) -> 2018.8 (2086.2) MB, 4.6 / 0.2 ms  (average mu = 0.616, current mu = 0.650) allocation failure
[10924:000001C9DE4FDA90]    94237 ms: Scavenge 2024.7 (2086.2) -> 2020.4 (2102.2) MB, 10.7 / 0.1 ms  (average mu = 0.616, current mu = 0.650) allocation failure


<--- JS stacktrace --->

FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
 1: 00007FF636BA815F v8::internal::CodeObjectRegistry::~CodeObjectRegistry+114079
 2: 00007FF636B354C6 DSA_meth_get_flags+65542
 3: 00007FF636B3637D node::OnFatalError+301
 4: 00007FF63746BA0E v8::Isolate::ReportExternalAllocationLimitReached+94
 5: 00007FF637455FED v8::SharedArrayBuffer::Externalize+781
 6: 00007FF6372F93BC v8::internal::Heap::EphemeronKeyWriteBarrierFromCode+1468
 7: 00007FF6372F64D4 v8::internal::Heap::CollectGarbage+4244
 8: 00007FF6372F3E50 v8::internal::Heap::AllocateExternalBackingStore+2000
 9: 00007FF6373189D6 v8::internal::Factory::NewFillerObject+214
10: 00007FF63704AEA5 v8::internal::DateCache::Weekday+1797
11: 00007FF6374F9701 v8::internal::SetupIsolateDelegate::SetupHeap+494417
12: 000001C9E021B304
[nodemon] app crashed - waiting for file changes before starting...

## number of records processed 26683 from 34705 record the first time

1. heap limit Allocation failed = JavaScript heat out of memory




