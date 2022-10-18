import 'package:flutter/material.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';
import 'package:sign_button/sign_button.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:axios/axios.dart';
import 'package:http/http.dart' as http;
import './register.dart';
import './dashboard.dart';
import './link.dart';

const primaryColor = Color(0xFFD8EEFE);
TextEditingController emailController = TextEditingController();
TextEditingController passwordController = TextEditingController();

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primaryColor: primaryColor,
        appBarTheme: const AppBarTheme(
          iconTheme: IconThemeData(color: Color(0xFF094067)),
          foregroundColor: Color(0xFF094067),
        ),
      ),
      home: const MyHomePage(title: 'AREA'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: primaryColor,
        title: Text(widget.title),
      ),
      body: ListView(children: <Widget>[
        Container(
          margin: const EdgeInsets.only(top: 50, left: 42),
          child: const Text(
            'Welcome\nBack',
            style: TextStyle(
                color: Color(0xFF094067),
                fontFamily: 'Orbitron',
                fontSize: 50,
                fontWeight: FontWeight.w100),
          ),
        ),
        Container(
          padding: const EdgeInsets.all(10),
          margin: const EdgeInsets.only(top: 150),
          child: TextFormField(
            controller: emailController,
            decoration: const InputDecoration(
              icon: Icon(Icons.man),
              labelText: 'Username / Email',
              labelStyle: TextStyle(
                color: Color(0xFF094067),
              ),
              enabledBorder: UnderlineInputBorder(
                borderSide: BorderSide(color: Color(0xFF094067)),
              ),
            ),
          ),
        ),
        Container(
          padding: const EdgeInsets.all(10),
          child: TextFormField(
            controller: passwordController,
            obscureText: true,
            decoration: const InputDecoration(
              icon: Icon(Icons.lock),
              labelText: 'Password',
              labelStyle: TextStyle(
                color: Color(0xFF094067),
              ),
              enabledBorder: UnderlineInputBorder(
                borderSide: BorderSide(color: Color(0xFF094067)),
              ),
            ),
          ),
        ),
        Container(
            padding:
                const EdgeInsets.only(left: 50, top: 50, right: 50, bottom: 20),
            height: 120,
            width: 130,
            child: ElevatedButton(
                onPressed: () async {
                  var body = {
                    'email': (emailController.text),
                    'password': (passwordController.text),
                  };
                  final response = await http.post(
                      Uri.parse('http://localhost:8080/auth/login'),
                      body: body);
                  if (response.statusCode == 200) {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const Dashboard()),
                    );
                  } else {
                    showDialog(
                      context: context,
                      builder: (context) {
                        return const AlertDialog(
                          content: Text(
                            "Email or Password are wrong",
                            style: TextStyle(color: Colors.red),
                          ),
                        );
                      },
                    );
                  }
                },
                style: ButtonStyle(
                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ))),
                child: const Text(
                  'Sign-in',
                  style: TextStyle(
                      fontFamily: 'Orbitron',
                      fontSize: 25,
                      fontWeight: FontWeight.w100),
                ))),
        Container(
            padding: const EdgeInsets.only(
                left: 100, top: 20, right: 100, bottom: 0),
            height: 60,
            width: 60,
            child: ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const RegisterRoute()),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFEF4565),
                ),
                child: const Text(
                  'Create an account',
                  style: TextStyle(
                      fontFamily: 'Orbitron',
                      fontSize: 15,
                      fontWeight: FontWeight.w100),
                ))),
        Container(
            padding: const EdgeInsets.only(
                left: 100, top: 10, right: 87, bottom: 10),
            width: 60,
            height: 60,
            child: SignInButton(
              buttonType: ButtonType.google,
              onPressed: () {
                GoogleSignIn().signIn();
              },
            ))
      ]),
    );
  }
}
