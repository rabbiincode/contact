import { Component, inject } from '@angular/core';
import { FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})

export class AddContactComponent {
  private fb: FormBuilder = inject(FormBuilder)

  contactForm = this.fb.group({
    name: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    email: ['', [Validators.required, Validators.email]],
    addresses: this.fb.array([], Validators.required),
    longitude: [{ value: 0.0000, disabled: true }],
    latitude: [{ value: 0.0000, disabled: true }]
  })

  ngOnInit(): void {
    this.addAddress()
    this.getUserLocation()
  }

    // Function to get the user's geolocation
    getUserLocation(): void {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          // Set the values in the form
          this.contactForm.patchValue({
            latitude: latitude,
            longitude: longitude
          })
        }, (error) => {
          console.error('Error retrieving geolocation: ', error)
          alert('Unable to retrieve your location.')
        })
      } else {
        alert('Geolocation is not supported by your browser.')
      }
    }

  get addresses() {
    return this.contactForm.get('addresses') as FormArray
  }

  addAddress(): void {
    if (this.addresses.length < 5) {
      this.addresses.push(this.fb.control('', Validators.required))
    }
  }

  removeAddress(index: number): void {
    if (this.addresses.length > 1) {
      this.addresses.removeAt(index)
    }
  }

  submitContact(): void {
    if (this.contactForm.valid) {
      const contacts = JSON.parse(localStorage.getItem('contacts') || '[]')
      contacts.push(this.contactForm.getRawValue())  // Push form data to array
      localStorage.setItem('contacts', JSON.stringify(contacts))  // Save to local storage
    }
  }
}
