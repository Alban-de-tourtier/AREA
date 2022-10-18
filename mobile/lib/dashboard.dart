import 'package:flutter/material.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';
import 'package:sign_button/sign_button.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:axios/axios.dart';
import './register.dart';
import './link.dart';
import './main.dart';

class Dashboard extends StatelessWidget {
  const Dashboard({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: primaryColor,
        title: const Text('Dashboard'),
      ),
      floatingActionButton: SpeedDial(
        animatedIcon: AnimatedIcons.menu_close,
        backgroundColor: const Color(0xFFD8EEFE),
        foregroundColor: const Color(0xFF094067),
        spacing: 12,
        children: [
          SpeedDialChild(
            child: const Icon(Icons.add),
            backgroundColor: const Color(0xFFD8EEFE),
            foregroundColor: const Color(0xFF094067),
            label: 'Add',
          ),
          SpeedDialChild(
            child: const Icon(Icons.delete),
            backgroundColor: const Color(0xFFD8EEFE),
            foregroundColor: const Color(0xFF094067),
            label: 'Delete',
          ),
          SpeedDialChild(
              child: const Icon(Icons.link),
              backgroundColor: const Color(0xFFD8EEFE),
              foregroundColor: const Color(0xFF094067),
              label: 'Link a service',
              onTap: () async {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const Link()),
                );
              })
        ],
      ),
    );
  }
}
