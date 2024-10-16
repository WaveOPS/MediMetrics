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
import com.example.medimetrics.ui.theme.MediMetricsTheme
import com.example.medimetrics.viewmodel.TourPlannerViewModel
import com.example.medimetrics.views.HomeScreen
import com.example.medimetrics.views.LoginScreen
import com.example.medimetrics.views.NewItemScreen
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
                val encodedName = Uri.encode(employee.name)
                val encodedArea = Uri.encode(employee.area)
                val encodedPhoto = Uri.encode(employee.photo)

                // Navigating to the HomeScreen, passing encoded employee details
                navController.navigate("home/$encodedName/$encodedArea/$encodedPhoto")
            }
        }

        // Home screen composable
        composable(
            "home/{name}/{area}/{photo}",
            arguments = listOf(
                navArgument("name") { type = NavType.StringType },
                navArgument("area") { type = NavType.StringType },
                navArgument("photo") { type = NavType.StringType }
            )
        ) { backStackEntry ->
            // Extracting the passed arguments to display on the HomeScreen
            val employee = Employee(
                name = backStackEntry.arguments?.getString("name") ?: "",
                area = backStackEntry.arguments?.getString("area") ?: "",
                photo = backStackEntry.arguments?.getString("photo") ?: ""
            )

            // Pass employee object to HomeScreen
            HomeScreen(employee = employee, navController)
        }

        composable("tourPlanner") {
            TourPlanner(navController = navController, viewModel = tourPlannerViewModel)
        }
        composable("newItem") {
            NewItemScreen(navController = navController, viewModel = tourPlannerViewModel)
        }
    }
}


@Composable
fun AppNavigation(viewModel: TourPlannerViewModel = TourPlannerViewModel()) {
    val navController = rememberNavController()

    NavHost(navController, startDestination = "tourPlanner") {
        composable("tourPlanner") {
            TourPlanner(navController = navController, viewModel = viewModel)
        }
        composable("newItem") {
            NewItemScreen(navController = navController, viewModel = viewModel)
        }
    }
}


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