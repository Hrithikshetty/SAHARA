
import 'package:flutter/material.dart';
import 'package:twilio_flutter/twilio_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:math';

import 'package:volunteer/pages/homeScreen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  TextEditingController phoneNumberController = TextEditingController();
  TextEditingController otpController = TextEditingController();
  TwilioFlutter twilioFlutter = TwilioFlutter(
    accountSid: 'ACa633806085e43aeb57bb352b521bef6c',
    authToken: 'b20c4ac5205c83aedd41ee06d1e9a61b',
    twilioNumber: '+16366140831',
  );

  String? savedOTP;
  String? savedPhoneNumber;
  bool isOTPVerified = false;
  Future<void> savePhoneNumberLocally(String phoneNumber) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('phone_number', phoneNumber);
    print('Phone number saved locally: $phoneNumber');
  }

  bool showPhoneNumberField = true;
  String generateOTP() {
    Random random = Random();
    String otp = '';
    for (int i = 0; i < 6; i++) {
      otp += random.nextInt(10).toString();
    }
    return otp;
  }
  Future<void> sendOTP(String phoneNumber) async {
    try {
      String otp =generateOTP();
      phoneNumber = '+91' + phoneNumber.substring(phoneNumber.length - 10);
      await twilioFlutter.sendSMS(
        toNumber: phoneNumber,
        messageBody: 'Your OTP for verification: $otp',
      );
      print('OTP sent successfully to $phoneNumber');
      saveOTP(otp);
      setState(() {
        showPhoneNumberField = false;
      });
    } catch (e) {
      print('Error sending OTP: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error sending OTP. Please try again later.'),
        ),
      );
    }
  }

  Future<void> saveOTP(String otp) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('otp', otp);
    print('OTP saved locally: $otp');
  }

  Future<bool> verifyOTP(String enteredOTP) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    savedOTP = prefs.getString('otp');
    return savedOTP != null && savedOTP == enteredOTP;
  }

  @override
  void initState() {
    super.initState();
    checkOTPVerification();
  }

  Future<void> checkOTPVerification() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    isOTPVerified = prefs.getBool('is_otp_verified') ?? false;
    if (isOTPVerified) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => HomeScreen()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sahara'),
        backgroundColor: Colors.blue,
      ),
      body: Center(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 40),
          child: Column(
            children: [
              Image.asset("assets/4957136_4957136.jpg"),
              if (showPhoneNumberField)
                TextField(
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(borderSide: BorderSide(color: Colors.orangeAccent, width: 2)),
                    prefixText: '+91',
                    labelText: 'Enter Phone Number',
                    prefixIcon: Icon(
                      Icons.phone,
                      color: Colors.blue,
                    ),
                  ),
                  controller: phoneNumberController,
                  keyboardType: TextInputType.number,
                ),
              SizedBox(height: 20),
              if (showPhoneNumberField)
                ElevatedButton(
                  onPressed: () {
                    String phoneNumber = phoneNumberController.text.trim();
                    if (phoneNumber.isNotEmpty) {
                      sendOTP(phoneNumber);
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('Please enter a phone number.'),
                        ),
                      );
                    }
                  },
                  child: Text('Send OTP'),
                ),
              if (!showPhoneNumberField)
                TextField(
                  controller: otpController,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    labelText: 'Enter OTP',
                    border: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.blue),
                    ),
                  ),
                ),
              SizedBox(height: 20),
              if (!showPhoneNumberField)
                ElevatedButton(
                  onPressed: () async {
                    String enteredOTP = otpController.text.trim();
                    if (enteredOTP.isNotEmpty) {
                      bool isVerified = await verifyOTP(enteredOTP);
                      if (isVerified) {
                        print('OTP verified successfully');
                        SharedPreferences prefs = await SharedPreferences.getInstance();
                        await prefs.setBool('is_otp_verified', true); 
                        Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(builder: (context) => HomeScreen()),
                        );
                      } else {
                        print('Invalid OTP');
                      }
                    } else {
                      print('Please enter OTP');
                    }
                  },
                  child: Text('Verify OTP'),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

