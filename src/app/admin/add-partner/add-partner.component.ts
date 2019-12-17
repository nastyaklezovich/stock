import { Component, OnInit } from '@angular/core';
import { PartnerService } from '../../services/partner.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css']
})
export class AddPartnerComponent implements OnInit {

  roles = [{ name: "поставщик" }, { name: "покупатель" }];
  PartnerForm: FormGroup;

  constructor(private fb: FormBuilder, private ps: PartnerService) { }

  ngOnInit() {
    this.PartnerForm = this.fb.group({
      name: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.required
      ])],
      role: [''],
      address: ['', Validators.required],
    })
  }

  add_partner(name, role, address) {
    const partner = {
      name: name,
      role: role,
      address: address,
    }
    console.log(partner);
    this.ps.add_partner(partner);
  }

  account_validation_messages = {
    'name': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'maxlength', message: 'Название не может содержать больше 25 символов' },
      { type: 'pattern', message: 'Некорректное название' },
    ],
    'address': [
      { type: 'required', message: 'Заполните поле' },
    ]
  }

}
