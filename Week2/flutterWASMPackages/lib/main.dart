import 'package:flutter/material.dart';
import 'dart:async';

import 'package:flutter/services.dart';
import 'package:flutter_wasm/flutter_wasm.dart';
import 'package:flutter_wasm_interop/flutter_wasm_interop.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String _platformVersion = 'Unknown';
  int _counter = 0;
  WasmLoader _wasm;

  @override
  void initState() {
    _wasm = WasmLoader.fromAssets('assets/add.wasm');
    super.initState();
    initPlatformState();

  }

  // Platform messages are asynchronous, so we initialize in an async method.
  Future<void> initPlatformState() async {
    String platformVersion;
    int counter;
    // Platform messages may fail, so we use a try/catch PlatformException.
    counter = _wasm.functionParam('add_one', _counter) as int;
    try {
      //counter = _wasm.functionParam('add_one', _counter) as int;
      print(counter);
      platformVersion = await FlutterWasm.platformVersion;
      print(platformVersion);
    } on Error {
      print(Error);
      platformVersion = 'Failed to get platform version.';
    }

    // If the widget was removed from the tree while the asynchronous platform
    // message was in flight, we want to discard the reply rather than calling
    // setState to update our non-existent appearance.
    if (!mounted) return;

    setState(() {
      _counter = counter;
      _platformVersion = platformVersion;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Plugin example app'),
        ),
        body: Center(
          child: Text('Counter: $_counter\n' + '$_platformVersion'),
        ),
      ),
    );
  }
}