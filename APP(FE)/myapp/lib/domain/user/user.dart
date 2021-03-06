import 'package:intl/intl.dart';

class User {
  final int? id;
  final String? username;
  final String? militaryNumber;
  // κ³κΈ
  final String? rank;
  // μμ
  final String? unit;
  final Map<String, dynamic>? allergy;

  User({
    this.id,
    this.username,
    this.militaryNumber,
    this.rank,
    this.unit,
    this.allergy,
  });

  User.fromJson(Map<String, dynamic> json)
      : id = json["id"],
        username = json["name"],
        militaryNumber = json["militaryNumber"],
        rank = json["grade"],
        unit = json["belong"],
        allergy = json["allergy"];
}
