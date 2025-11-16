import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Game {
  id: number;
  title: string;
  genre: string;
  image: string;
}

const initialGames: Game[] = [
  { id: 1, title: 'Cyberpunk 2077', genre: 'RPG', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=600&fit=crop' },
  { id: 2, title: 'The Witcher 3', genre: 'RPG', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop' },
  { id: 3, title: 'Red Dead Redemption 2', genre: 'Action', image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=600&fit=crop' },
  { id: 4, title: 'God of War', genre: 'Action', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop' },
  { id: 5, title: 'Elden Ring', genre: 'RPG', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop' },
  { id: 6, title: 'Horizon Forbidden West', genre: 'Action', image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop' },
  { id: 7, title: 'Spider-Man', genre: 'Action', image: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=400&h=600&fit=crop' },
  { id: 8, title: 'Assassins Creed Valhalla', genre: 'Action', image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=600&fit=crop' },
  { id: 9, title: 'Call of Duty', genre: 'Shooter', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop' },
  { id: 10, title: 'Fallout 4', genre: 'RPG', image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400&h=600&fit=crop' },
  { id: 11, title: 'GTA V', genre: 'Action', image: 'https://images.unsplash.com/photo-1547082661-e6d9b0493e98?w=400&h=600&fit=crop' },
  { id: 12, title: 'Starfield', genre: 'RPG', image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=600&fit=crop' },
];

const genres = ['Все', 'RPG', 'Action', 'Shooter', 'Horror', 'Strategy', 'Racing'];

export default function Index() {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [newGame, setNewGame] = useState({ title: '', genre: 'RPG', image: '' });
  const [imagePreview, setImagePreview] = useState('');
  const { toast } = useToast();

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'Все' || game.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setNewGame({ ...newGame, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGame = () => {
    if (!newGame.title || !newGame.image) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля и загрузите изображение",
        variant: "destructive",
      });
      return;
    }

    const newGameData: Game = {
      id: games.length + 1,
      title: newGame.title,
      genre: newGame.genre,
      image: newGame.image,
    };

    setGames([newGameData, ...games]);
    setNewGame({ title: '', genre: 'RPG', image: '' });
    setImagePreview('');
    setUploadDialogOpen(false);
    
    toast({
      title: "Успешно!",
      description: "Иконка добавлена в библиотеку",
    });
  };

  const handleDownload = (game: Game) => {
    const link = document.createElement('a');
    link.href = game.image;
    link.download = `${game.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Скачивание началось",
      description: `Иконка "${game.title}" загружается`,
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        
        <div className="relative">
          <header className="border-b border-white/10 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Icon name="Gamepad2" className="text-white" size={24} />
                  </div>
                  <h1 className="text-2xl font-bold text-white">GameIcons</h1>
                </div>
                
                <nav className="flex items-center gap-4">
                  <a href="#" className="hidden md:block text-white/80 hover:text-white transition-colors">Главная</a>
                  <a href="#library" className="hidden md:block text-white/80 hover:text-white transition-colors">Библиотека</a>
                  <Button
                    onClick={() => setUploadDialogOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Icon name="Upload" className="mr-2" size={18} />
                    Загрузить
                  </Button>
                </nav>
              </div>
            </div>
          </header>

          <section className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-white mb-4">
                Библиотека игровых иконок
              </h2>
              <p className="text-white/60 text-lg">
                Замените стандартные ярлыки на красивые иконки для ваших любимых игр
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <Input
                  type="text"
                  placeholder="Поиск игр..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500"
                />
              </div>
            </div>

            <div id="library" className="mb-8 flex flex-wrap gap-2 justify-center">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  variant={selectedGenre === genre ? 'default' : 'outline'}
                  className={
                    selectedGenre === genre
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white'
                  }
                >
                  {genre}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  onClick={() => setSelectedGame(game)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-white/5 border border-white/10 transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white text-sm font-medium line-clamp-2">
                        {game.title}
                      </h3>
                      <Badge className="mt-1 bg-blue-600 hover:bg-blue-700 text-xs">
                        {game.genre}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="bg-[#0f1419] border-white/10 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">Загрузить иконку</DialogTitle>
            <DialogDescription className="text-white/60">
              Добавьте свою иконку в библиотеку
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-white mb-2 block">Название игры</Label>
              <Input
                id="title"
                type="text"
                placeholder="Введите название игры"
                value={newGame.title}
                onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="genre" className="text-white mb-2 block">Жанр</Label>
              <Select value={newGame.genre} onValueChange={(value) => setNewGame({ ...newGame, genre: value })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0f1419] border-white/10">
                  {genres.filter(g => g !== 'Все').map((genre) => (
                    <SelectItem key={genre} value={genre} className="text-white focus:bg-white/10">
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="image" className="text-white mb-2 block">Изображение</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="bg-white/5 border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                </div>
                
                {imagePreview && (
                  <div className="relative aspect-[2/3] max-h-60 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <Button
              onClick={handleAddGame}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12"
            >
              <Icon name="Plus" className="mr-2" size={20} />
              Добавить в библиотеку
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedGame} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="bg-[#0f1419] border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedGame?.title}</DialogTitle>
            <DialogDescription className="text-white/60">
              Скачайте иконку для замены стандартного ярлыка
            </DialogDescription>
          </DialogHeader>
          
          {selectedGame && (
            <div className="space-y-6">
              <div className="relative aspect-[2/3] max-h-[400px] rounded-lg overflow-hidden border border-white/10">
                <img
                  src={selectedGame.image}
                  alt={selectedGame.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-white/60">Жанр:</span>
                  <Badge className="bg-blue-600 hover:bg-blue-700">
                    {selectedGame.genre}
                  </Badge>
                </div>
                
                <Button
                  onClick={() => handleDownload(selectedGame)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12"
                >
                  <Icon name="Download" className="mr-2" size={20} />
                  Скачать иконку
                </Button>
                
                <div className="bg-white/5 rounded-lg p-4 text-sm text-white/60">
                  <p className="font-medium text-white mb-2">Как установить:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Скачайте иконку</li>
                    <li>Нажмите ПКМ на ярлык игры</li>
                    <li>Выберите "Свойства" → "Сменить значок"</li>
                    <li>Укажите путь к скачанной иконке</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
