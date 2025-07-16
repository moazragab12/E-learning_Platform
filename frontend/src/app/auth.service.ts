import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:3000/api/auth';
  private LESSONS_URL = 'http://localhost:3000/api/lessons';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) } : {};
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, data);
  }

  getLessons(): Observable<any> {
    return this.http.get(this.LESSONS_URL);
  }

  getLesson(id: string): Observable<any> {
    return this.http.get(`${this.LESSONS_URL}/${id}`);
  }

  createLesson(data: any): Observable<any> {
    return this.http.post(this.LESSONS_URL, data, this.getAuthHeaders());
  }

  updateLesson(id: string, data: any): Observable<any> {
    return this.http.put(`${this.LESSONS_URL}/${id}`, data, this.getAuthHeaders());
  }

  deleteLesson(id: string): Observable<any> {
    return this.http.delete(`${this.LESSONS_URL}/${id}`, this.getAuthHeaders());
  }

  getCourses(): Observable<any> {
    return this.http.get('http://localhost:3000/api/courses');
  }

  createCourse(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/courses', data, this.getAuthHeaders());
  }

  getCourseById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/courses/${id}`);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/courses/${id}`, this.getAuthHeaders());
  }

  updateCourse(id: string, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/courses/${id}`, data, this.getAuthHeaders());
  }
}
