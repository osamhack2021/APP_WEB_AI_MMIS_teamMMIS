import 'package:intl/intl.dart';

class Administer {
  final int? id;
  final String? username;
  final String? militaryNumber;
  // κ³κΈ
  final String? rank;
  // μμ
  final String? unit;
  final DateTime? created;
  final DateTime? updated;

  Administer({
    this.id,
    this.username,
    this.militaryNumber,
    this.rank,
    this.unit,
    this.created,
    this.updated,
  });

  Administer.fromJson(Map<String, dynamic> json)
      : id = json["id"],
        username = json["name"],
        militaryNumber = json["militaryNumber"],
        rank = json["grade"],
        unit = json["belong"],
        created = DateFormat("yyyy-mm-dd").parse(json["createtime"]),
        updated = DateFormat("yyyy-mm-dd").parse(json["updatetime"]);
}
