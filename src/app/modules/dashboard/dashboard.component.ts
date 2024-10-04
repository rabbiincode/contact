import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GoogleMapsModule, MatIconModule, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  map = false
  active = 0
  views = [
    {
      view: 'Grid',
      icon: 'menu'
    },
    {
      view: 'Map',
      icon: 'map'
    }
  ]
  contacts: any[] = [];

  ngOnInit(): void {
    this.contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
  }

  changeView(index: number) {
    this.active = index
    this.map = !this.map
  }

  getRandomAddress(addresses: string[]): string {
    return addresses[Math.floor(Math.random() * addresses.length)];
  }
}
