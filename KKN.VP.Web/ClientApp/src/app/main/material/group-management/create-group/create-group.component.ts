import { NgIf } from "@angular/common";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-create-group",
  templateUrl: "./create-group.component.html",
  styleUrls: ["./create-group.component.scss"],
})
export class CreateGroupComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
titlename = "สร้างกลุ่ม";
  addNewItem(value: string) {
    this.newItemEvent.emit(value);
    console.log(this.newItemEvent);
  }

  items = [];

  addItem(newItem: string, newName: string) {
    // if(newItem ==''){
    //   alert("123")
    //   return false;
    // }
    console.log(newItem);
    console.log(newName);
    this.items.push({ newItem, newName });
    console.log("complete ", this.items);
  }
  // save(){
  //   http.post('https:kkn.co.th/api/material/bindSvave')
  // }

  deldetjson(row) {
    console.log("deldetjson", row);
    this.items.splice(row, 1);
  }

  groupcodeinput = "";
  groupnameinput: String = "";

  ed = this.groupcodeinput;

  editdata(edittt) {
    console.log(this.groupcodeinput);
    console.log(edittt);
    this.items[this.ed] = edittt;

    console.log("-=============================", this.items);
  }

  lirow(i: any, item: any) {
    console.log("row li ", i);
    console.log("date item ", item);
  }

  public groupdate = [
    {
      groupcode: this.groupcodeinput,
      groupname: this.groupnameinput,
    },
  ];

  public contentHeader: object;
  constructor() {}

  ngOnInit(): void {


    this.contentHeader = {
      headerTitle: "Create Group",
      actionButton: false,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Material",
            isLink: true,
            link: "/material",
          },
          {
            name: "GroupManament",
            isLink: true,
            link: "/material/group-management",
          },
          {
            name: "CreateGroup",
            isLink: false,
          },
        ],
      },
    };
  }
}
