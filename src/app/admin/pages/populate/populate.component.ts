import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {ModalService} from "../common/modal.service";

declare var swal: any;

@Component({
  selector: 'app-populate',
  templateUrl: './populate.component.html',
  styleUrls: ['./populate.component.scss']
})
export class PopulateComponent implements OnInit {
  populatedFields: any;
  teamList: any[];
  selectedTeam: any;
  userName: any;
  constructor(private dataService: DataService,
              private modalService: ModalService) { }

  ngOnInit() {
    this.loadFormFields();
    this.loadTeams();
  }

  loadTeams() {
    this.dataService.getAllTeams()
      .subscribe((results) => {
        this.teamList = results;
        console.log('resuls', results);
      },
        (err) => {
          console.log('error occurred', err.message);
        })
  }

  loadFormFields() {
    this.dataService.getPopulateFields()
      .subscribe((fields) => {
        this.populatedFields = fields;
      }, (err) => {
        console.log('error occurred', err.message);
      });
  }

  removeItem(key, listName) {
    this.dataService.removeField(key, listName)
      .then(() => {
        console.log('successfully removed');
      }, (err) => {
        console.log('error occurred', err.message);
      });
  }

  editTeam(team) {
    this.userName = '';
    this.selectedTeam = team;
    this.openModal('custom-modal-1');
  }

  addNewField(listName) {
    swal({
      title: `Enter ${listName}`,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        return this.dataService.addField(value, listName)
          .then(response => {
            return response;
          });
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        swal({
          type: 'success',
          title: 'Successful!'
        }).then(() => {});
      }
    });
  }

  addNewTeam(listName) {
    swal({
      title: `Enter ${listName}`,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        return this.dataService.addTeam(value, listName)
          .then(response => {
            return response;
          });
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        swal({
          type: 'success',
          title: 'Successful!'
        }).then(() => {});
      }
    });
  }

  removeUser(key, teamName) {
    this.dataService.removeUser(key, teamName)
      .then((res) => {
        console.log('user removed successfully!');
        this.closeModal('custom-modal-1');
      }, (err) => {
        console.log('error occurred', err.message);
        this.closeModal('custom-modal-1');
      });
  }

  saveUser(value, teamName) {
    this.dataService.addUser(value, teamName)
      .then((result) => {
        this.closeModal('custom-modal-1');
        swal({
          type: 'success',
          title: 'User created!'
        }).then(() => {});
      });
  }

  /*Modal Popup Functionality*/
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
