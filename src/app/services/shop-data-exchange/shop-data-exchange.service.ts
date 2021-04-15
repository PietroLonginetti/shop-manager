import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Apollo, gql } from 'apollo-angular'

@Injectable({
  providedIn: 'root'
})
export class ShopDataExchangeService {
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
          phone
          province
          image {
            id
            fullpath(thumbnail: "content")
          }
          gallery { 
            image {
                id
                fullpath(thumbnail: "content")
            } 
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
  }
  `;
  private updateShopMutation = gql`
  mutation UpdateNegozio($id: Int!, $input: UpdateNegozioInput!) {
    updateNegozio(id: $id, input: $input){
      success
      message
    }
  }
`;
  private baseUrl = 'https://pimcore-tesista.sintrasviluppo.it';
  private _shops = [
    // VECCHIO MODELLO
    // new BehaviorSubject<Object>({
    //   id: 1,
    //   MBLink: '',
    //   name: 'Good shop',
    //   imgs: ['https://placeimg.com/360/150', 'https://placeimg.com/360/150/any'],
    //   valutation: Array(2),
    //   address: 'Via Roma 2, 50125',
    //   telephone: '+390555047041',
    //   hours: [
    //     [], //sun
    //     [ //mon
    //       { from: '2021-03-10T08:00', to: '2021-03-10T12:00' },
    //       { from: '2021-03-10T14:00', to: '2021-03-10T17:00' },
    //       { from: '2021-03-10T14:00', to: '2021-03-10T17:00' }
    //     ],
    //     [ //tue
    //       { from: '2021-03-10T08:00', to: '2021-03-10T12:00' },
    //       { from: '2021-03-10T14:00', to: '2021-03-10T17:00' }
    //     ],
    //     [ //wed
    //       { from: '2021-03-10T08:00', to: '2021-03-10T12:00' },
    //       { from: '2021-03-10T14:00', to: '2021-03-10T17:00' }
    //     ],
    //     [ //thu
    //       { from: '2021-03-10T08:00', to: '2021-03-10T12:00' },
    //       { from: '2021-03-10T14:00', to: '2021-03-10T17:00' }
    //     ],
    //     [ //fri
    //       { from: '2021-03-10T08:00', to: '2021-03-10T12:00' },
    //       { from: '2021-03-10T14:00', to: '2021-03-10T17:00' }
    //     ],
    //     [ //sat
    //       { from: '2021-03-10T08:00', to: '2021-03-10T12:00' }
    //     ]
    //   ],
    //   automations: { music: false, heating: false }
    // })
  ]

  constructor(private apollo: Apollo) {
    this.apollo.watchQuery({
      query: this.shopsDataQuery
    })
      .valueChanges.subscribe((result: any) => {
        console.log('query fetched')
        let numOfShops = result.data.getNegozioListing.totalCount;
        for (let i = 0; i < numOfShops; i++) {

          let shData = result.data.getNegozioListing.edges[i].node;

          let imgs = [];
          imgs.push(this.baseUrl + shData.image.fullpath);
          shData.gallery.forEach(el => {
            imgs.push(this.baseUrl + el.image.fullpath)
          });

          let hours = [[], [], [], [], [], [], []];
          shData.openings.forEach(op => {
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
          if (shData.googlemybusiness == null)
            mblink = '';
          else mblink = shData.googlemybusiness;

          this._shops[i] = new BehaviorSubject({
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
            hours: hours,
            automations: { music: false, heating: false }
          })
        }
        console.log(this._shops)
      })
  }

  public addShop() {
    this._shops.push(new BehaviorSubject<Object>({
      id: (this.shops.length * 2) + 1, //Generazione pseudocasuale degli id NON basata su valori posizionali
      MBLink: '',
      name: '',
      imgs: [],
      valutation: Array(0),
      // ---- address ----
      street: '',
      zip: '',
      city: '',
      province: '',
      countryCode: '',
      // -----------------
      telephone: '',
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


  public modifyShop(modifications: Object, id: string): Promise<void> {
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

    //TODO: send http request to update db
    // for (let i = 0; i < this._shops.length; i++) {
    //   if (this._shops[i].value['id'] == id) {
    //     this._shops[i].next(modifications);
    //     return;
    //   }
    // }
  }
  public deleteShop(id: string) {
    //TODO: send http request to update db
    for (let i = 0; i < this._shops.length; i++) {
      if (this._shops[i].value['id'] === parseInt(id)) {
        this._shops.splice(i, 1);
        return;
      }
    }
  }
  get numOfShops() {
    return this._shops.length;
  }
  public getShopByPosition(i: number) {
    return this._shops[i].asObservable();
  }
  public getShopById(id) {
    let target = null
    this._shops.forEach((shop) => {
      if (shop.value.id == id) {
        target = shop;
      }
    })
    return target.asObservable();
  }
  get shops() {
    return this._shops
  }
}
