package com.example.medimetrics.views

import android.util.Log
import android.widget.Toast
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.requiredSize
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Alignment.Companion.CenterVertically
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.example.medimetrics.GeofenceHelper
import com.example.medimetrics.R
import com.example.medimetrics.data.model.Employee
import com.example.medimetrics.ui.theme.MediMetricsTheme
import com.example.medimetrics.viewmodel.HomeViewModel
import com.google.android.gms.location.LocationServices

@Composable
fun HomeScreen(
    employee: com.example.medimetrics.data.model.Employee,
    navController: NavController
) {

    val viewModel: HomeViewModel = viewModel()
    val context = LocalContext.current
    val geofenceClient = LocationServices.getGeofencingClient(context)
    val geofenceHelper = GeofenceHelper(context, geofenceClient)

    // Initialize geofence
    LaunchedEffect(Unit) {
        geofenceHelper.createGeofence(
            geoId = "doctorVisit",
            latitude = 37.421937, // Example coordinates
            longitude = -122.084063,
            radius = 2000f
        )
    }

    val isInsideGeofence by viewModel.isInsideGeofence.collectAsState()

    Log.d("HomeScreen", "Homescreen")
    Box(Modifier.fillMaxSize()) {
        Image(
            painter = painterResource(id = R.drawable.bg2_app),
            contentDescription = null,
            modifier = Modifier
                .fillMaxSize()
                .requiredSize(1000.dp)
        )
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(10.dp)
        ) {
            // Header Section
            Spacer(modifier = Modifier.height(40.dp))

            AppHeader()

            Spacer(modifier = Modifier.weight(1f))

            // Profile Section
            ProfileSection(employee = employee)

            Spacer(modifier = Modifier.weight(1f))

            // Weekly Calls Card
            MonthlyCallsCard()

            Spacer(modifier = Modifier.weight(1f))

            // Dashboard Icons
            DashboardIcons(
                navController = navController,
                employee = employee
                )

            Spacer(modifier = Modifier.weight(1f))

            // Bottom Section (Current Visit Info)
            CurrentVisitBar(
                isInsideGeofence,
                navController
            )

            Spacer(modifier = Modifier.height(10.dp))
        }
    }
}


@Composable
fun AppHeader() {
    Row(
        modifier = Modifier
            .fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,  // Space between app name and logout icon
        verticalAlignment = Alignment.CenterVertically
    ) {
        // App Name Logo
        Image(
            painter = painterResource(id = R.drawable.medimetircs_final),
            contentDescription = null,
            modifier = Modifier
                .height(48.dp)
                .width(280.dp),
            colorFilter = ColorFilter.tint(Color(0xff24B1EF))
        )

        // Logout Icon
        Icon(
            painter = painterResource(id = R.drawable.logout_icon),  // Replace with your logout icon resource
            contentDescription = "Logout",
            modifier = Modifier
                .size(42.dp)
                .clickable { },  // Action for the logout click
            tint = Color.Red // You can change this color if needed
        )
    }
}

@Composable
fun ProfileSection(employee: Employee) {
    Row(
        verticalAlignment = CenterVertically,
        modifier = Modifier.fillMaxWidth(),
    ) {

        Column(modifier = Modifier.padding(12.dp)) {
            Text(text = "Welcome back,", fontSize = 18.sp)
            Text(text = "${employee.name} !", fontWeight = FontWeight.Bold, fontSize = 34.sp)
            Text(text = "${employee.area} · Medical Representative", fontSize = 14.sp)
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


@Composable
fun MonthlyCallsCard() {
    Card(
        colors = CardDefaults.cardColors(Color(0xFFAFD6F3)),
        modifier = Modifier
            .fillMaxWidth()
//            .height(70.dp)
        ,
        elevation = CardDefaults.cardElevation(8.dp)
    ) {
        Row(
            modifier = Modifier
                .padding(10.dp)
            ,
            verticalAlignment = CenterVertically,

            ) {
            Text(
                text = "January",
                color = Color.Black,
                fontWeight = FontWeight.Bold,
                fontSize = 25.sp,
                modifier = Modifier.padding(start = 10.dp)
            )
            Spacer(modifier = Modifier.weight(1f))
            Text(
                text = "12",
                color = Color.Black,
                fontSize = 36.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "Calls Completed",
                color = Color.Black,
                fontSize = 12.sp,
                modifier = Modifier.padding(start = 1.dp)
            )
        }
    }
}


@Composable
fun DashboardIcons(
    navController: NavController,
    employee: Employee
) {
    Column(
        verticalArrangement = Arrangement.Center
    ) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(10.dp),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            DashboardCardItem(
                iconRes = R.drawable.planner_icon,
                label = "Tour Planner",
                onClick = {
                    println("Navigating to Tour Planner with employeeId: ${employee.id}")
                    navController.navigate("tourPlanner/${employee.id}")  }
            )
            DashboardCardItem(
                iconRes = R.drawable.selfie_icon,
                label = "Selfie",
                onClick = { }
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            DashboardCardItem(
                iconRes = R.drawable.select_icon,
                label = "Select Call",
                onClick = { /* Handle click for Select Call */ }
            )
            DashboardCardItem(
                iconRes = R.drawable.dvl_icon,
                label = "DVL",
                onClick = { /* Handle click for DVL */ }
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            DashboardCardItem(
                iconRes = R.drawable.doctor_icon,
                label = "Doctor Details",
                onClick = { /* Handle click for Doctor Details */ }
            )
            DashboardCardItem(
                iconRes = R.drawable.notes_icon,
                label = "Notes",
                onClick = { /* Handle click for Other */ }
            )
        }
    }
}

@Composable
fun DashboardCardItem(iconRes: Int, label: String, backgroundColor: Color = Color(0xFFE1EBFF), onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .size(140.dp) // Same size for each card
            .clickable { onClick() },
        colors = CardDefaults.cardColors(backgroundColor),
        elevation = CardDefaults.cardElevation(40.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(10.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Icon(
                painter = painterResource(id = iconRes),
                contentDescription = label,
                modifier = Modifier.size(60.dp),
                tint = Color.Unspecified
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = label,
                fontSize = 20.sp,
                fontWeight = FontWeight.Medium,
                textAlign = TextAlign.Center
            )
        }
    }
}


@Composable
fun CurrentVisitBar(
    isInsideGeofence: Boolean,
    navController: NavController
) {
    val context = LocalContext.current

    Card(
        colors = CardDefaults.cardColors(Color(0xFF0D4D7A)),
//        backgroundColor = Color(0xFFFF5C5C),
        modifier = Modifier
            .fillMaxWidth()
            .padding(top = 10.dp)
            .height(80.dp)
            .clickable {

                if (!isInsideGeofence) {
                    Toast.makeText(context, "Current Visit Started!", Toast.LENGTH_SHORT).show()
                    navController.navigate("completeVisit")
                } else {
                    Toast.makeText(context, "Please reach the location to start the visit.", Toast.LENGTH_SHORT).show()
                }
            },
        elevation = CardDefaults.cardElevation(10.dp)

    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                painter = painterResource(id = R.drawable.compass_icon),
                contentDescription = "Location",
                modifier = Modifier.size(60.dp),
                tint = Color.White
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(text = "Current Visit", color = Color.White, fontWeight = FontWeight.Bold)
            Spacer(modifier = Modifier.weight(1f))
            Column(horizontalAlignment = Alignment.Start) {
                Text(
                    text = "Dr. Name",
                    color = Color.White
                )
                Text(
                    text = "Location",
                    color = Color.White
                )
            }
        }
    }
}


@Preview(showBackground = true)
@Composable
fun MainScreenPreview() {
    MediMetricsTheme {
        HomeScreen(
            employee = Employee(23,"jane","ahdfh","jfahf"),
            navController = rememberNavController()
        )
    }

}