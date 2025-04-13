import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CourseComponent } from './components/course/course.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignalsExamplsComponent } from './components/signals-exampls/signals-exampls.component';
import { BasicsComponent } from './components/basics/basics.component';
import { ResultComponent } from './components/result/result.component';
import { SandboxComponent } from './components/sandbox/sandbox.component'
import { FourierComponent } from './components/fourier/fourier.component';

export const routes: Routes = [
    {path: "", redirectTo: "/home", pathMatch: 'full'},
    {path: "home", component: HomeComponent, title: 'Home Page'},
    {path: "course", component: CourseComponent, title: 'Courses Page'},
    {path: "quiz", component: QuizComponent, title: 'Quizes Page'},
    {path: "signals", component: SignalsExamplsComponent, title: 'Examples'},
    {path: "basics", component: BasicsComponent, title: 'Basics'},
    {path: "result", component: ResultComponent, title: 'Result'},
    {path: "sandbox", component: SandboxComponent, title: 'Sandbox'},
    {path: "sandbox-fourier", component: FourierComponent, title: 'Fourier'},
    {path: "**", component: NotFoundComponent, title: '404 Not Found'}
];
