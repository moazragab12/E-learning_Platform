import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
    _id: string;
    title: string;
    description: string;
    imageUrl?: string; // Course image URL
    instructorId: {
        _id: string;
        profile: {
            firstName: string;
            lastName: string;
        };
    };
    categories: string[];
    published: boolean;
    averageRating: number;
    feedbackCount: number;
    createdAt: string;
    updatedAt: string;
}

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private apiUrl = 'http://localhost:3000/api/courses';

    constructor(private http: HttpClient) { }

    getTopCourses(limit: number = 6): Observable<Course[]> {
        return this.http.get<Course[]>(`${this.apiUrl}/top?limit=${limit}`);
    }

    getAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(`${this.apiUrl}`);
    }

    getCourseById(id: string): Observable<Course> {
        return this.http.get<Course>(`${this.apiUrl}/${id}`);
    }
}
