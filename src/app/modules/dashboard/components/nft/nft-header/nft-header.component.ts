import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameInfor } from 'src/app/core/models/db.model';
import { MenuItem } from 'src/app/core/models/menu.model';
import { GameService } from 'src/app/core/services/game.service';
import { UserLogged } from 'src/app/core/utils/userLogged';
import { NavbarSubmenuComponent } from 'src/app/modules/layout/components/navbar/navbar-submenu/navbar-submenu.component';
import { MenuService } from 'src/app/modules/layout/services/menu.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-nft-header',
    templateUrl: './nft-header.component.html',
    styleUrl : './nft-header.component.css',
    standalone: true,
      imports: [NgFor, NgClass, NavbarSubmenuComponent, CommonModule, FormsModule],
})
export class NftHeaderComponent implements OnInit {
  private showMenuClass = ['scale-100', 'animate-fade-in-up', 'opacity-100', 'pointer-events-auto'];
  private hideMenuClass = ['scale-95', 'animate-fade-out-down', 'opacity-0', 'pointer-events-none'];
  public userLogged = new UserLogged();
  public game: GameInfor[] = [];
  public searchQuery: string = ''; // Bind this to the search input field
  public filteredGames: GameInfor[] = []; // Store filtered games for the search

  constructor(public menuService: MenuService, private gameService: GameService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.gameService.getListGame().subscribe((data) => {
      this.game = data.data;
      this.filteredGames = this.game; // Initially, display all games
    });
  }

  public toggleMenu(menu: MenuItem): void {
    menu.selected = !menu.selected;
  }
onPageChange(page: number): void {
  // Correct the router path and pass the query parameter
  this.router.navigate(['/dashboard/game-detail/'+page]);
}

  public mouseEnter(event: any): void {
    let element = event.target.querySelector('app-navbar-submenu').children[0];
    if (element) {
      this.hideMenuClass.forEach((c) => element.classList.remove(c));
      this.showMenuClass.forEach((c) => element.classList.add(c));
    }
  }

  public mouseLeave(event: any): void {
    let element = event.target.querySelector('app-navbar-submenu').children[0];
    if (element) {
      this.showMenuClass.forEach((c) => element.classList.remove(c));
      this.hideMenuClass.forEach((c) => element.classList.add(c));
    }
  }

  // Method to filter games based on search query
  public searchGames(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredGames = this.game;
      console.log("filteredGames",this.filteredGames);
    } else {
      this.filteredGames = this.game.filter((game) =>
        game.Title.toLowerCase().includes(this.searchQuery.toLowerCase())

      );
      console.log("filteredGames",this.filteredGames);

    }
  }
}