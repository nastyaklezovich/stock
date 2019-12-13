import { Component, OnInit, TemplateRef } from '@angular/core';
import { PartnerService } from '../../services/partner.service'
import Partner from '../../models/Partner'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-view-partner',
  templateUrl: './view-partner.component.html',
  styleUrls: ['./view-partner.component.css']
})
export class ViewPartnerComponent implements OnInit {

  partners: Partner[];
  roles = [{ name: "поставщик" }, { name: "покупатель" }];
  modalRef: BsModalRef;
  PartnerForm: FormGroup;
  res: {} = {};
  partner: {} = {};

  constructor(private ps: PartnerService, private route: ActivatedRoute, private fb: FormBuilder, private modalService: BsModalService) {
    this.createForm();
  }

  createForm() {
    this.PartnerForm = this.fb.group({
      name: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.pattern('^[A-Za-zА-Яа-яЁё]+$'),
        Validators.required
      ])],
      role: [''],
      address: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.ps.get_partners().subscribe((data: Partner[]) => {
      console.log(data);
      this.partners = data;
    })
  }

  delete_partner(id) {
    this.ps.delete_partner(id).subscribe(res => {
      alert('Партнер удален!')
      console.log(id);
      console.log('Partner deleted')
    })
  }

  save(name, role, address, id) {

    const partner = {
      name: name,
      role: role,
      address: address,
    }

    this.route.params.subscribe(params => {
      this.ps.update_partner(partner, id);
      this.modalRef.hide();
    });
  }

  open_modal(template: TemplateRef<any>, id) {
    this.modalRef = this.modalService.show(template);
    console.log(id);
    this.ps.edit_partner(id).subscribe(((res: Partner[]) => {
      this.partner = { ...res };
      this.res = res;
      console.log(res);
    }));
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
