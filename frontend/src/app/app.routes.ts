import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { HomeComponent } from './pages/home/home';
import { AddFeedback } from './pages/student/add-feedback/add-feedback';
import { AddCourse } from './pages/instructor/add-course/add-course';
import { StudentCourses } from './pages/courses/courses';
import { CourseContentComponent } from './pages/course-content/course-content';
import { AddLessonComponent } from './pages/add-lesson/add-lesson';
import { MockupCourseListComponent } from './pages/course-list/mockup-course-list';
import { MockupHomeComponent } from './pages/home/mockup-home';
import { AddCourseComponent } from './pages/add-course/add-course';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'student/courses/:id/feedback', component: AddFeedback },
  { path: 'instructor/add-course', component: AddCourse },
  { path: 'student/courses', component: StudentCourses },
  { path: 'course-list', component: MockupCourseListComponent },
  //{ path: 'add-course', component: AddCourseComponent },
 // { path: 'home', component: MockupHomeComponent },
  { path: 'course-content/:courseId', component: CourseContentComponent },
  { path: 'add-lesson/:courseId', component: AddLessonComponent },
];
