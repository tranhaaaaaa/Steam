import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameInfor } from 'src/app/core/models/db.model';
import { RouterLink } from '@angular/router';

interface GameWithTags {
  title: string;
  image: string;
  tags: string[];
}

@Component({
  selector: 'app-because-you-played',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './because-you-played.component.html',
  styleUrls: ['./because-you-played.component.css']
})
export class BecauseYouPlayedComponent implements OnInit {
  @Input() games : GameInfor[] = [];
  // games: GameWithTags[] = [
  //   { title: 'Stumble Guys', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1677740/header.jpg', tags: ['Battle Royale', 'Online Co-Op', 'Survival', 'PvP'] },
  //   { title: 'Crab Game', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1782210/header.jpg', tags: ['Battle Royale', 'PvP', 'Psychological Horror', 'Free to Play'] },
  //   { title: 'Super Animal Royale', image: 'https://cdn.akamai.steamstatic.com/steam/apps/843380/header.jpg', tags: ['Battle Royale', 'Online Co-Op', 'PvP', 'Survival'] },
  //   { title: 'Totally Accurate Battlegrounds', image: 'https://cdn.akamai.steamstatic.com/steam/apps/823130/header.jpg', tags: ['Battle Royale', 'PvP', 'Co-op', 'Survival'] },
  // ];
  constructor() { }
  ngOnInit(): void { 
    console.log("gameinfo",this.games);
  }
}