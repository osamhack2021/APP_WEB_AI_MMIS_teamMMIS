import 'package:get/get.dart';

import '../host.dart';

class AdministerProvider extends GetConnect {
  Future<Response> login(Map data) => post("$host/login", data);
}