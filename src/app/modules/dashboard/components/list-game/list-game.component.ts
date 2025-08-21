import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, GameCategory, GameInfor } from 'src/app/core/models/db.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { GameService } from 'src/app/core/services/game.service';
import { GamecategoryService } from 'src/app/core/services/gamecategory.service';
import { switchMap, take } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-list-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-game.component.html',
  styleUrl: './list-game.component.css'
})
export class ListGameComponent implements OnInit {
  public listGame: GameInfor[] = [];
  public listCategory: Category[] = [];
  public listGameOfCategory: GameCategory[] = [];

  private allGameCategories: GameCategory[] = []; // dữ liệu gốc để search/filter
  selectedTab = 'Tất cả';
  searchTerm = '';
  public tabTitles: string[] = [];
  cateName: string | null = null;

  constructor(
    private service: GameService,
    private router: Router,
    private cateService: CategoryService,
    private route: ActivatedRoute,
    private gameCategorySevice: GamecategoryService
  ) {}

  ngOnInit(): void {
    this.onGetData();
  }

  // Khử trùng lặp theo key
  private uniqueBy<T>(arr: T[], keyFn: (x: T) => string | number): T[] {
    const m = new Map<string | number, T>();
    for (const it of arr) {
      const k = keyFn(it);
      if (!m.has(k)) m.set(k, it);
    }
    return Array.from(m.values());
  }

  onSearchChange() {
    const base = this.selectedTab === 'Tất cả'
      ? this.allGameCategories
      : this.allGameCategories.filter(g => g.CategoryName === this.selectedTab);

    const term = this.searchTerm.trim().toLowerCase();
    this.listGameOfCategory = term
      ? base.filter(g => g.GameName.toLowerCase().includes(term))
      : base;
  }

  onGetData() {
    this.route.paramMap
      .pipe(
        take(1),
        switchMap(pm => {
          this.cateName = pm.get('name');
          // tải categories + games song song
          return forkJoin({
            categories: this.cateService.getListCategory(),
            games: this.gameCategorySevice.getListGameCategory()
          });
        })
      )
      .subscribe(({ categories, games }) => {
        const rawCats = categories?.data ?? [];
        this.listCategory = this.uniqueBy(rawCats, c => (c.Id ?? c.CategoryName));
        const catNames = this.listCategory.map(c => c.CategoryName);
        this.tabTitles = ['Tất cả', ...Array.from(new Set(catNames))];
        const rawGames: GameCategory[] = games?.data ?? [];
        this.allGameCategories = this.uniqueBy(rawGames, g => (g.CategoryID ?? g.GameName));
        const tab = this.cateName && catNames.includes(this.cateName) ? this.cateName : 'Tất cả';
        this.selectedTab = tab;
        this.applyTabFilter();
      });
  }

  private applyTabFilter() {
    const base = this.selectedTab === 'Tất cả'
      ? this.allGameCategories
      : this.allGameCategories.filter(g => g.CategoryName === this.selectedTab);

    // Nếu có searchTerm đang nhập thì áp thêm filter
    const term = this.searchTerm.trim().toLowerCase();
    this.listGameOfCategory = term
      ? base.filter(g => g.GameName.toLowerCase().includes(term))
      : base;
  }

  onTabChange(tab: string): void {
    if (this.selectedTab === tab) return;
    this.selectedTab = tab;
    this.searchTerm = ''; // reset search khi chuyển tab
    // cập nhật URL nhưng KHÔNG gọi lại API nhiều lần
    this.router.navigate(['/dashboard/list-game', tab], { replaceUrl: true });
    this.applyTabFilter();
  }

  onGameSelect(gameId: number) {
    this.router.navigate(['/dashboard/game-detail', gameId]);
  }
}
