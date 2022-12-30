import Component from "./Component";

interface Particle {
    time: number,
    speed: number
}

export default class ParticleInformation extends Component {
    public map: Map<number, Particle>;

    constructor(particles: Map<number, Particle>) {
        super();
        this.map = particles;
    }
}
