package com.example.medimetrics

import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.medimetrics.data.model.Employee
import com.example.medimetrics.ui.theme.MediMetricsTheme
import com.example.medimetrics.viewmodel.TourPlannerViewModel
import com.example.medimetrics.views.CompleteVIsitScreen
import com.example.medimetrics.views.HomeScreen
import com.example.medimetrics.views.LoginScreen
import com.example.medimetrics.views.DoctorList
import com.example.test.TourPlanner

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MediMetricsTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    MyApp()
                }
            }
        }
    }
}

@Composable
fun MyApp() {
    // Setting up NavController
    val navController = rememberNavController()

    val tourPlannerViewModel = remember { TourPlannerViewModel() }

    NavHost(navController, startDestination = "login") {
        // Login screen composable
        composable("login") {
            LoginScreen { employee ->
                // URL encode employee details to handle spaces and special characters
                val encodedId = Uri.encode(employee.id.toString())
                val encodedName = Uri.encode(employee.name)
                val encodedArea = Uri.encode(employee.area)
                val encodedPhoto = Uri.encode(employee.photo)
                println(encodedId)

                // Navigating to the HomeScreen, passing encoded employee details
                navController.navigate("home/$encodedId/$encodedName/$encodedArea/$encodedPhoto")
            }
        }

        // Home screen composable
        composable(
            "home/{employeeId}/{name}/{area}/{photo}",
            arguments = listOf(
                navArgument("employeeId") { type = NavType.StringType },  // Change to StringType
                navArgument("name") { type = NavType.StringType },
                navArgument("area") { type = NavType.StringType },
                navArgument("photo") { type = NavType.StringType }
            )
        ) { backStackEntry ->
            // Extracting the passed arguments to display on the HomeScreen
            val employee = Employee(
                id = backStackEntry.arguments?.getString("employeeId")?.toInt() ?: 0,  // Convert to Int here
                name = backStackEntry.arguments?.getString("name") ?: "",
                area = backStackEntry.arguments?.getString("area") ?: "",
                photo = backStackEntry.arguments?.getString("photo") ?: ""
            )

            println("employee Id: ${employee.id}")


            // Pass employee object to HomeScreen
            HomeScreen(employee = employee, navController)
        }

        composable(
            "tourPlanner/{employeeId}",
            arguments = listOf(
                navArgument("employeeId") { type = NavType.StringType }  // Ensure it's StringType
            )
        ) { backStackEntry ->
            // Safely retrieving the employeeId from arguments
            val employeeIdString = backStackEntry.arguments?.getString("employeeId") ?: "0"
            val employeeId = employeeIdString.toIntOrNull() ?: 0

            TourPlanner(
                navController = navController,
                empId = employeeId,
                viewModel = tourPlannerViewModel
            )
        }

        composable("doctorList") {
            DoctorList(navController = navController, viewModel = tourPlannerViewModel)
        }

        composable("completeVisit") {
            CompleteVIsitScreen(
                employee = Employee(23,"Dr. Pawan Jamkhande","Vashi","")
            )
        }
    }
}



//@Composable
//fun AppNavigation(viewModel: TourPlannerViewModel = TourPlannerViewModel()) {
//    val navController = rememberNavController()
//
//    NavHost(navController, startDestination = "tourPlanner") {
//        composable("tourPlanner/{employeeId}") { backStackEntry ->
//            val employeeId = backStackEntry.arguments?.getString("employeeId")?.toInt() ?: 0
//            TourPlanner(viewModel = TourPlannerViewModel, employeeId = employeeId)
//        }
//        composable("newItem") {
//            DoctorList(navController = navController, viewModel = viewModel)
//        }
//
//        composable("doctorList") {
//            DoctorList(navController = navController, viewModel = viewModel)
//        }
//    }
//}


// A placeholder data class for Employee
data class Employee(
    val name: String,
    val area: String,
    val photo: String
)


@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    MediMetricsTheme {
        MyApp()
    }
}