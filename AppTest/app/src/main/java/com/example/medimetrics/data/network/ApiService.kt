package com.example.medimetrics.data.network

import com.example.medimetrics.data.model.Doctor
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.GET
import retrofit2.http.POST

interface ApiService {
    @FormUrlEncoded
    @POST("login.php")
    fun login(
        @Field("userId") username: String,
        @Field("password") password: String
    ): Call<EmployeeResponse>

    @GET("get-doctors.php")  // Replace with your PHP endpoint
    suspend fun getDoctors(): Response<List<Doctor>>

    @FormUrlEncoded
    @POST("upload_tour_plan.php")
    suspend fun uploadTourPlan(
        @Field("employee_id") employeeId: Int,
        @Field("doctor_list") doctorList: String
    ): Response<TourPlan>
}

data class EmployeeResponse(
    val status: String,
    val id: Int?,
    val name: String?,
    val area: String?,
    val photo: String?
)

data class TourPlan(
    val success: Boolean,
    val message: String
)
