import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { CourseContentComponent } from './pages/course-content/course-content';
import { AddLessonComponent } from './pages/add-lesson/add-lesson';
import { MockupCourseListComponent } from './pages/course-list/mockup-course-list';
import { MockupHomeComponent } from './pages/home/mockup-home';
import { AddCourseComponent } from './pages/add-course/add-course';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MockupHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'course-list', component: MockupCourseListComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'course-content/:courseId', component: CourseContentComponent },
  { path: 'add-lesson/:courseId', component: AddLessonComponent },
];
