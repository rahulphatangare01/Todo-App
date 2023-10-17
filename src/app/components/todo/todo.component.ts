import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validator, Validators} from '@angular/forms'
import { ITask } from 'src/app/model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoForm !: FormGroup;
  tasks :ITask [] = [];
  inprogress :ITask [] = [];
  done : ITask [] = [];
  updateIndex!:any;
  isEditEnabled:boolean = false;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
       item :['',Validators.required]
    })
  }

  addTask(){

    this.tasks.push({
      description:this.todoForm.value.item,
      done:false
    })
    this.todoForm.reset();
    console.log(this.tasks,'addd')
  }

  onEdit(item:ITask, i:number){
    this.todoForm.controls['item'].setValue(item.description)
    this.updateIndex = i;
    this.isEditEnabled = true;

  }
  updateTask(){
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;

  }



  deleteTask(index:number){
    this.tasks.splice(index,1)
  }
  deleteTaskInProgress(index:number){
    this.inprogress .splice(index,1)
  }
  deleteDoneTask(index:number){
    this.tasks.splice(index,1)
  }
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
