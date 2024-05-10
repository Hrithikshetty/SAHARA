
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:geolocator/geolocator.dart';
import 'package:twilio_flutter/twilio_flutter.dart';
import 'package:permission_handler/permission_handler.dart';

class PersonelPage extends StatefulWidget {
  PersonelPage({Key? key}) : super(key: key);

  @override
  _PersonelPageState createState() => _PersonelPageState();
}

class _PersonelPageState extends State<PersonelPage> {
  TextEditingController messageController = TextEditingController();
  TwilioFlutter twilioFlutter = TwilioFlutter(
    accountSid: 'ACa633806085e43aeb57bb352b521bef6c',
    authToken: 'fa6f32e73582e323c7b065b85a79f0ae',
    twilioNumber: '+16366140831',
  );
  String? assignedVolunteer;
  bool smsSent = false;

  Future<void> findVolunteers(String message, double latitude, double longitude) async {
    try {
      var response = await http.post(
        Uri.parse('https://a848-202-140-46-74.ngrok-free.app/find-volunteers'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'message': message, 'latitude': latitude, 'longitude': longitude}),
      );
      if (response.statusCode == 200) {
        var data = jsonDecode(response.body);
        String matchedCategory = data['matched_category'];
        List<dynamic> phoneNumbersDynamic = data['phone_numbers'];
        List<String> phoneNumbers = phoneNumbersDynamic.cast<String>();
        String buddy = data['buddy'];
        print('Matched Category: $matchedCategory');
        print('Phone Numbers: $phoneNumbers');
        print('Buddy: $buddy');
        double l = latitude;
        double long = longitude;
        String googleMapsLink = 'https://www.google.com/maps/search/?api=1&query=$l,$long';

        await sendSMS(phoneNumbers, message, buddy, googleMapsLink);
      } else {
        print('Failed to fetch volunteers: ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching volunteers: $e');
    }
  }

  Future<void> sendSMS(List<String> phoneNumbers, String message, String buddy, String googleMapsLink) async {
    for (var phoneNumber in phoneNumbers) {
      String formattedPhoneNumber = phoneNumber;
      try {
        print(phoneNumber);
        await twilioFlutter.sendSMS(
          toNumber: formattedPhoneNumber,
          messageBody: 'You have been called for help, message:$message. Location: $googleMapsLink. Your buddy is $buddy.',
        );
        print('SMS sent to $phoneNumber');
        setState(() {
          smsSent = true;
          assignedVolunteer = formattedPhoneNumber;
        });
      } catch (e) {
        print("Error in submitting SMS: $e");
      }
    }
  }

  Future<void> getLocationAndFindVolunteers(String message) async {
    if (await Permission.location.request().isGranted) {
      try {
        Position position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.best);
        double latitude = position.latitude;
        double longitude = position.longitude;
        await findVolunteers(message, latitude, longitude);
      } catch (e) {
        print('Error getting location: $e');
      }
    } else {
      print('Location permission denied');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Community Page', style: TextStyle(color: Colors.white)),
        backgroundColor: Colors.indigo[900],
      ),
      body:
      Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(10.0),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    spreadRadius: 3,
                    blurRadius: 7,
                    offset: Offset(0, 3),
                  ),
                ],
              ),
              child: Column(
                children: [
                  Text(
                    'Enter your message:',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 10),
                  TextField(
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Message',
                      hintText: 'Enter your problem here....',
                    ),
                    controller: messageController,
                    maxLines: 4,
                  ),
                  SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () async {
                      String message = messageController.text;
                      await getLocationAndFindVolunteers(message);
                    },
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all<Color>(Colors.red),
                    ),
                    child: Text("Find Volunteers", style: TextStyle(color: Colors.white)),
                  ),
                ],
              ),
            ),
            SizedBox(height: 20),
            if (smsSent)
              Container(
                padding: EdgeInsets.all(16.0),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(10.0),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.5),
                      spreadRadius: 3,
                      blurRadius: 7,
                      offset: Offset(0, 3),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    Text(
                      'SMS sent successfully to the volunteer:',
                      style: TextStyle(fontSize: 18),
                    ),
                    SizedBox(height: 10),
                    Text(
                      'Assigned Volunteer: $assignedVolunteer',
                      style: TextStyle(fontSize: 18),
                    ),
                  ],
                ),
              )
          ],
        ),
      ),
    );
  }
}
