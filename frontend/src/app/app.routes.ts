import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { AddFeedback } from './pages/student/add-feedback/add-feedback';
import { AddCourse } from './pages/instructor/add-course/add-course';
import { StudentCourses } from './pages/courses/courses';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'student/courses/:id/feedback', component: AddFeedback },
  { path: 'instructor/add-course', component: AddCourse },
  { path: 'student/courses', component: StudentCourses },
];
