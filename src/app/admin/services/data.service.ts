import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs/index';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afDb: AngularFireDatabase) {
  }

  getRecords(): Observable<any> {
    return this.afDb.list('record')
      .snapshotChanges()
      .pipe(map((snapshots) => {
        const data = [];
        snapshots.map((snap) => {
          const values = snap.payload.val();
          for (const i in values) {
            values[i]['createdBy'] = snap.key;
            values[i]['id'] = i;
            data.push(values[i]);
          }
        });
        return data;
      }));
  }

  getAllTeams() {
    return this.afDb.list('populate/teams')
      .snapshotChanges()
      .pipe(map((snapshots) => {
          const data = [];
          snapshots.forEach((snap) => {
              const team = {};
              team['key'] = snap.key;
              team['users']= [];
              const users = snap.payload.val();
              for (const u in users) {
                team['users'].push({value: users[u], key: u});
              }
              data.push(team);
          });
        return data;
      }));
  }

  getPopulateFields(): Observable<any> {
    return this.afDb.list('populate')
      .snapshotChanges()
      .pipe(map((snapshots) => {
        const data = {};
        snapshots.forEach((snap) => {
           const object = [] ;
           const values = snap.payload.val();
           for (const i in values) {
             object.push({ value: values[i], key: i});
           }
          data[snap.key] = object;
        });
        return data;
      }));
  }

  removeField(key, listName) {
    return this.afDb.list(`populate/${listName}`)
      .remove(key);
  }

  removeUser(key, teamName) {
    return this.afDb.list(`populate/teams/${teamName}`)
      .remove(key);
  }

  addField(value, listName) {
    return this.afDb.list(`populate/${listName}`)
      .push(value);
  }

  addUser(value, teamName) {
    return this.afDb.list(`populate/teams/${teamName}`)
      .push(value);
  }

  addTeam(value, listName) {
    return this.afDb.list(`populate/${listName}/${value}`)
      .push('');
  }

}
