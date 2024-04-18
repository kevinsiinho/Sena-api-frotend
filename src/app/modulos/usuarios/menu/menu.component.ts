import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Usuarios } from '../../../class/usuarios/usuarios';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-items',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})

export class MenuComponent implements OnInit {

  mobileQuery: MediaQueryList;


  fillerNav=[
    {name:"Inscribirme",route:"/inscribirme",icon:"add",Nopermiso:"todos"},
    {name:"Crear",icon:"add_box", bajar:"expand_more",Nopermiso:"estudiante",
    submenu:[
      {name:"Curso",route:"/create-curso",icon:"feed",},
      {name:"Contenido",route:"/publicacion",icon:"density_large"}
    ]},
    {name:"Listar",icon:"receipt_long", bajar:"expand_more",Nopermiso:"todos",
    submenu:[
      {name:"Curso",route:"/listar-cursos",icon:"fact_check"},
      {name:"Estudiantes",route:"/listar-estudiantes",icon:"group"},
      {name:"Contenidos",route:"/listar-contenidos",icon:"toc"}
    ]},
    {name:"Mensajes",route:"/seguimiento",icon:"chat",Nopermiso:"todos",},
    {name:"Notificaciones",route:"/seguimiento",icon:"notifications",Nopermiso:"todos",},
    {name:"Perfil",route:"/perfil",icon:"manage_accounts",Nopermiso:"todos",},
    {name:"Cerrar sesión",route:"/login",icon:"logout",Nopermiso:"todos",}

  ]


  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    public usuarioServices:UsuariosService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  opened=true

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;
  public usuario = new Usuarios()


  async  ngOnInit(){
    if(await this.usuarioServices.Verificar()){
      const { value } = await Preferences.get({ key: 'token' });
      if(value){
        this.usuarioServices.Quien(value).then((res)=>{
        this.usuarioServices.InfoUsuarios(res.data).then((data)=>{
          this.usuario=data
        })
      })
    }

    }
  }

}
