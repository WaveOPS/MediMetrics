package com.example.medimetrics.views

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment.Companion.CenterVertically
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.jetpackcomposeauthui.components.CButton
import com.example.medimetrics.data.model.Employee
import com.example.medimetrics.ui.theme.MediMetricsTheme
import com.example.test.components.BottomNavBar

@Composable
fun CompleteVIsitScreen(employee: Employee) {
    Column (
        modifier = Modifier
            .fillMaxSize()
            .padding(top = 40.dp, start = 10.dp, end = 10.dp, bottom = 10.dp)
    ) {

        DoctorProfileSection(employee = employee)

        Spacer(modifier = Modifier.weight(1f))

        Column {
            CButton(text = "Feedback", onClick = { /*TODO*/ })

            Spacer(modifier = Modifier.padding(12.dp))

            CButton(text = "Rescheduled", onClick = { /*TODO*/ })

            Spacer(modifier = Modifier.padding(12.dp))

            CButton(text = "Doctor Not Available", onClick = { /*TODO*/ })

        }


        Spacer(modifier = Modifier.weight(1f))

        BottomNavBar()

    }
    
}

@Composable
fun DoctorProfileSection(employee: Employee) {
    Row(
        verticalAlignment = CenterVertically,
        modifier = Modifier.fillMaxWidth(),
    ) {

        Column(modifier = Modifier.padding(12.dp)) {
            Text(text = "Now Visiting,", fontSize = 18.sp)
            Text(text = "${employee.name} !", fontWeight = FontWeight.Bold, fontSize = 34.sp)
            Text(text = "${employee.area} · Orthopedist", fontSize = 14.sp)
        }

        Spacer(modifier = Modifier.weight(1f))

//         //Profile Image
//        Image(
//            painter = rememberImagePainter(employee.photo), // Use Coil for loading images from URLs
//            contentDescription = "Profile Image",
//            modifier = Modifier
//                .size(85.dp)
//                .clip(CircleShape),
//            contentScale = ContentScale.Crop,
//        )
    }
}



@Preview(showBackground = true)
@Composable
fun CompleteVisitPreview() {
    MediMetricsTheme {
        CompleteVIsitScreen(employee = Employee(23,"jane","ahdfh","jfahf"))
    }

}