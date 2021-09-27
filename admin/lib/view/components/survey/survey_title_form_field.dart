import 'package:admin/style.dart';
import 'package:flutter/material.dart';

import '../../../size.dart';

class SurveyTitleFormField extends StatelessWidget {
  final double width;
  final titleController = TextEditingController();
  final explainController = TextEditingController();
  final funValidate;

  SurveyTitleFormField({required this.width, this.funValidate});
  @override
  Widget build(BuildContext context) {
    titleController.text = "제목없는 설문지";
    explainController.text = "설명";
    return Container(
      margin: EdgeInsets.symmetric(vertical: gap_s),
      decoration: BoxDecoration(
        border: Border.all(),
        borderRadius: BorderRadius.circular(10),
      ),
      width: width,
      padding: const EdgeInsets.all(gap_m),
      child: Form(
        child: Column(
          children: [
            TextFormField(
              style: h5(),
              controller: titleController,
              decoration: InputDecoration(
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.grey[200]!),
                ),
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.lightGreen),
                ),
              ),
              validator: funValidate,
            ),
            TextFormField(
              controller: explainController,
              decoration: InputDecoration(
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.grey[200]!),
                ),
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.lightGreen),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}