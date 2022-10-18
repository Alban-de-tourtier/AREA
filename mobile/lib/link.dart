import 'package:flutter/material.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';
import 'package:sign_button/sign_button.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:axios/axios.dart';
import './register.dart';
import './main.dart';

class Link extends StatelessWidget {
  const Link({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: primaryColor,
          title: const Text('Link your services'),
        ),
        body: ListView(children: <Widget>[
          Container(
              padding: const EdgeInsets.only(
                  left: 90, top: 50, right: 90, bottom: 0),
              width: 100,
              height: 100,
              child: SignInButton(
                buttonType: ButtonType.youtube,
                onPressed: () {},
              )),
          Container(
              padding: const EdgeInsets.only(
                  left: 90, top: 30, right: 90, bottom: 0),
              width: 100,
              height: 80,
              child: SignInButton(
                buttonType: ButtonType.twitter,
                onPressed: () {},
              ))
        ]));
  }
}
