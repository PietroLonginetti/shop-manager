import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Apollo, gql } from 'apollo-angular'

@Injectable({
  providedIn: 'root'
})
export class ShopDataExchangeService {
  private allocateVectorFlag: boolean = true;
  private baseUrl = 'https://pimcore-tesista.sintrasviluppo.it';
  private _shops = {
    fetched: false,
    data: []
  };

  // Queries and Mutations
  private shopsDataQuery = gql`
  {
    getNegozioListing(first: 10, after: 0, sortBy: "name") {
      totalCount
      edges {
        node {
          id
          name
          city
          country_code
          email
          phone
          province
          image {
            id
            fullpath(thumbnail: "content")
          }  
          image1 {
            id
            fullpath(thumbnail: "content")
          }   
          image2 {
            id
            fullpath(thumbnail: "content")
          }       
          street
          zip
          openings { 
             ... on fieldcollection_Giorni {
              dayofweek
              closed
              partofday
              opening
              closing
            }
          }
          voto
          googlemybusiness
        }
      }
    }
  }`;
  private updateShopMutation = gql`
  mutation UpdateNegozio($id: Int!, $input: UpdateNegozioInput) {
    updateNegozio(id: $id, input: $input){
      success
      message
    }
  }`;
  private addShopMutation = gql`
  mutation CreateNegozio($keyName: String!, $path: String!, $input: UpdateNegozioInput) {
    createNegozio(key: $keyName, path: $path, input: $input){
      success
      message
    }
  }`;
  private deleteShopMutation = gql`
  mutation DeketeNegozio($id: Int!){
    deleteNegozio(id: $id){
      success
    }
  }`;

  // Constructor
  constructor(private apollo: Apollo) {
    this.apollo.watchQuery({
      query: this.shopsDataQuery
    })
      .valueChanges.subscribe((result: any) => {
        const numOfShops = result.data.getNegozioListing.totalCount;
        if (this.allocateVectorFlag) {
          this._shops.data = []
          for (let n = 0; n < numOfShops; n++) {
            this._shops.data[n] = new BehaviorSubject<Object>({})
          }
        }

        for (let i = 0; i < numOfShops; i++) {
          let shData = result.data.getNegozioListing.edges[i].node;

          let imgs = [];
          if(shData.image)
          imgs.push(this.baseUrl + shData.image.fullpath);
          if(shData.image1)
          imgs.push(this.baseUrl + shData.image1.fullpath);
          if(shData.image2)
          imgs.push(this.baseUrl + shData.image2.fullpath);

          let hours = [[], [], [], [], [], [], []];
          if(!shData.openings){}
          else shData.openings.forEach(op => {
            switch (op.dayofweek) {
              case 'Sun':
                if (!op.closed)
                  hours[0].push({ from: op.opening, to: op.closing, dayOfWeek: 'Sun' })
                break;
              case 'Mon':
                if (!op.closed)
                  hours[1].push({ from: op.opening, to: op.closing, dayOfWeek: 'Mon' })
                break;
              case 'Tue':
                if (!op.closed)
                  hours[2].push({ from: op.opening, to: op.closing, dayOfWeek: 'Tue' })
                break;
              case 'Wed':
                if (!op.closed)
                  hours[3].push({ from: op.opening, to: op.closing, dayOfWeek: 'Wed' })
                break;
              case 'Thu':
                if (!op.closed)
                  hours[4].push({ from: op.opening, to: op.closing, dayOfWeek: 'Thu' })
                break;
              case 'Fri':
                if (!op.closed)
                  hours[5].push({ from: op.opening, to: op.closing, dayOfWeek: 'Fri' })
                break;
              case 'Sat':
                if (!op.closed)
                  hours[6].push({ from: op.opening, to: op.closing, dayOfWeek: 'Sat' })
                break;
            }

          });

          let mblink;
          if (!shData.googlemybusiness)
            mblink = '';
          else mblink = shData.googlemybusiness;

          this._shops.data[i].next({
            id: shData.id,
            MBLink: mblink,
            name: shData.name,
            imgs: imgs,
            valutation: shData.voto,
            // ---- address ----
            street: shData.street,
            zip: shData.zip,
            city: shData.city,
            province: shData.province,
            countryCode: shData.country_code,
            // -----------------
            telephone: shData.phone,
            email: shData.email,
            hours: hours,
            automations: { music: false, heating: false }
          })
        }
        setTimeout(() => this._shops.fetched = true, 2000)
        console.log(this._shops)
      })
  }


  // Asyncronous Methods
  public addShop(newShop: Object): Promise<void> {
    this.allocateVectorFlag = true;

    let turns = []
    for (let i = 0; i < 7; i++) {
      newShop['hours'][i].forEach(turn => {
        turns.push({
          closed: false,
          dayofweek: turn.dayOfWeek,
          opening: turn.from,
          closing: turn.to
        })
      });
    }

    return new Promise<void>((resolve, reject) => {
      this.apollo.mutate({
        mutation: this.addShopMutation,
        variables: {
          keyName: newShop['name'],
          path: '/Negozi',
          input: {
            phone: newShop['telephone'],
            email: newShop['email'],
            street: newShop['street'],
            zip: newShop['zip'],
            city: newShop['city'],
            province: newShop['province'],
            country_code: newShop['countryCode'],
            googlemybusiness: newShop['MBLink'],
            openings: {
              replace: true,
              items: {
                Giorni: turns
              }
            }
          },
          refetchQueries: [
            { query: this.shopsDataQuery }
          ],
          awaitRefetchQueries: true
        }
      }).subscribe(
        ({ data }) => {
          console.log('got data', data);
          resolve();
        },
        (error) => {
          console.log('error:', error)
          reject();
        }
      )
    })
  }


  public modifyShop(modifications: Object): Promise<void> {
    this.allocateVectorFlag = false;

    let turns = []
    for (let i = 0; i < 7; i++) {
      modifications['hours'][i].forEach(turn => {
        turns.push({
          closed: false,
          dayofweek: turn.dayOfWeek,
          opening: turn.from,
          closing: turn.to
        })
      });
    }

    return new Promise<void>((resolve, reject) => {
      this.apollo.mutate({
        mutation: this.updateShopMutation,
        variables: {
          id: modifications['id'],
          input: {
            phone: modifications['telephone'],
            email: modifications['email'],
            street: modifications['street'],
            zip: modifications['zip'],
            city: modifications['city'],
            province: modifications['province'],
            country_code: modifications['countryCode'],
            googlemybusiness: modifications['MBLink'],
            openings: {
              replace: true,
              items: {
                Giorni: turns
              }
            }
          }
        },
        refetchQueries: [
          { query: this.shopsDataQuery }
        ],
        awaitRefetchQueries: true
      }).subscribe(
        ({ data }) => {
          console.log('got data', data);
          resolve();
        },
        (error) => {
          console.log('error:', error)
          reject();
        }
      )
    })
  }
  public deleteShop(id: number): Promise<void> {
    this.allocateVectorFlag = true;

    return new Promise<void>((resolve, reject) => {
      this.apollo.mutate({
        mutation: this.deleteShopMutation,
        variables: {
          id: id
        },
        refetchQueries: [
          {query: this.shopsDataQuery}
        ],
        awaitRefetchQueries: true
      }).subscribe(
        ({ data }) => {
          console.log('got data', data);
          resolve();
        },
        (error) => {
          console.log('error:', error)
          reject();
        }
      )
    })
  }

  // Syncronous Methods
  public createEmptyShop() {
    this._shops.data.push(new BehaviorSubject<Object>({
      id: 0, //valore che poi verra modificato nel BE
      MBLink: '',
      name: '',
      imgs: [],
      valutation: 0,
      // ---- address ----
      street: '',
      zip: '',
      city: '',
      province: '',
      countryCode: '',
      // -----------------
      telephone: '',
      email: '',
      hours: [
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ],
      automations: { music: false, heating: false }
    }))
  }
  public getShopByPosition(i: number) {
    return this._shops[i].asObservable();
  }
  public getShopById(id) {
    let target = null
    this._shops.data.forEach((shop) => {
      if (shop.value['id'] == id) {
        target = shop;
      }
    })
    return target.asObservable();
  }

  get shops() {
    return this._shops
  }
  get numOfShops(){
    return this._shops.data.length;
  }
}
