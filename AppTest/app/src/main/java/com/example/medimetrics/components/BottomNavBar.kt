package com.example.test.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.List
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.medimetrics.ui.theme.MediMetricsTheme


@Composable
fun BottomNavBar() {
    var selectedItem by remember { mutableStateOf(0) }

    val items = listOf(
        Icons.Default.List,         // Icon 1
        Icons.Default.CheckCircle,  // Icon 2
        Icons.Default.Home,         // Icon 3
        Icons.Default.Search,       // Icon 4
        Icons.Default.Email         // Icon 5
    )

    // Bottom Nav Bar container with increased height and padding
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),  // Increased padding for a larger container
        colors = CardDefaults.cardColors(Color(0xFFFF5F5F)),
        elevation = CardDefaults.cardElevation(10.dp),
        shape = RoundedCornerShape(20.dp)  // More rounded edges for aesthetics
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
//                .padding(horizontal = 10.dp, vertical = 12.dp)  // Increased padding inside the Row
                .height(80.dp),  // Increased height for the navbar
            horizontalArrangement = Arrangement.SpaceAround,
            verticalAlignment = Alignment.CenterVertically
        ) {
            items.forEachIndexed { index, icon ->
                IconButton(
                    onClick = { selectedItem = index },
                    modifier = Modifier
                        .size(64.dp) // Increased size of the IconButton
                        .padding(6.dp)
                ) {
                    Icon(
                        icon,
                        contentDescription = null,
                        tint = if (selectedItem == index) Color.White else Color.LightGray,
                        modifier = Modifier.size(36.dp)  // Larger icon size
                    )
                }
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun BottomNavBarPreview() {
    MediMetricsTheme {
        BottomNavBar()
    }
}

