import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CourseComponent } from './components/course/course.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignalGraphComponent } from './components/signal-graph/signal-graph.component';

export const routes: Routes = [
    {path: "", redirectTo: "/course", pathMatch: 'full'},
    {path: "home", component: HomeComponent, title: 'Home Page'},
    {path: "course", component: CourseComponent, title: 'Courses Page'},
    {path: "quiz", component: QuizComponent, title: 'Quizes Page'},
    {path: "graph", component: SignalGraphComponent, title: 'chart'},
    {path: "**", component: NotFoundComponent, title: '404 Not Found'}
];
