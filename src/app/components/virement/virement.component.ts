import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Benificiaire } from 'src/app/models/benificiaire';
import { Virement } from 'src/app/models/virement';
import { VirementsService } from 'src/app/services/virements.service';

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.scss']
})
export class VirementComponent implements OnInit {
  benificiaires:Benificiaire[]=[];

  test = this.benificiaires;
  settings = {
    actions: { edit: false, delete:false},
    add: {
      createButtonContent: 'Create',
      cancelButtonContent: 'Cancel',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: 'Edit',
      saveButtonContent: 'Save',
      cancelButtonContent: 'Cancel',
      confirmSave: true,


    },
    columns: {
     
      benificiaire: {
        editor: {
          type: 'list',
          config: {                  
            list: this.test,  

          }
        },
        title: 'benificiaire',
        valuePrepareFunction: (cell, row,test) => {
          //debugger
          var t=test.column.dataSet.columns[0].settings.editor.config.list.find(x=>x.value===cell)
          this.settings = Object.assign({}, this.settings);

          if(t)
           return t.title },
        filter: false,        
        
      }, 
      
     
      
      montant: {
        title: 'Montant'
      },
      motif: {
        title: 'Motif'
      },
      dateCreation: {
        title: 'Date de création',
        editable:false,
        addable: false,
      },
      dateExecution: {
        title: 'Date dexecution',
        editable:false,
        addable: false,
      },
     
      id: {
        title: 'ID',
        editable:false,
        addable: false,

            },
    }  
  };
 
  data =  [{
   
    id:"",
    montant: "",
    dateCreation:"",
    motif: "",
  }];

  
  virements:Virement[]=[];

  constructor(private virementService:VirementsService) { }

  ngOnInit(): void {
    this.getVirements()
    this.getBenificiaires()
    console.log(this.)
    //this.settings = Object.assign({}, this.settings);

  }

  getVirements(){
    this.virementService.getVirement().subscribe(
      (response:Virement[]) => {
        this.virements = response;
        console.log(response)
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        console.log(error.message)
      }
    );
  }

   getBenificiaires(){
    this.virementService.getBenificiaire().subscribe(
      (response:Benificiaire[]) => {
        this.benificiaires = response;
        console.log(response)
      //this.settings.columns.benificiaire.editor.config.list = this.benificiaires;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        console.log(error.message)
      }
    );
  }


  onAddVirement(event) {
    this.virementService.addVirement(event.newData).subscribe(
      res => {
      console.log(res); 
      this.getVirements();
      
     }, 
     (error:HttpErrorResponse) => {
      console.log(error);
      
      });
  
  }

  onUpdateVirement(event) {
    this.virementService.updateVirement(event.newData).subscribe(
      res => {
      console.log(res); 
      
     }, 
     (error:HttpErrorResponse) => {
      console.log(error);
      
      });
  
  }
}