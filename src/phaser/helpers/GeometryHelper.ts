import { PointInterface } from "../interfaces/PointInterface";

export default class GeometryHelper {
    static getInfluenceZone(startPoint: PointInterface, endPoint: PointInterface, width: number) {
        const angle = Phaser.Math.Angle.Between(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
        //const distance = Phaser.Math.Distance.Between(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
        const perpendicularWidth = width / 2;
    
        // Расчет четырех углов прямоугольника
        const points = [
            new Phaser.Geom.Point(
                startPoint.x + perpendicularWidth * Math.cos(angle + Math.PI / 2),
                startPoint.y + perpendicularWidth * Math.sin(angle + Math.PI / 2)
            ),
            new Phaser.Geom.Point(
                startPoint.x + perpendicularWidth * Math.cos(angle - Math.PI / 2),
                startPoint.y + perpendicularWidth * Math.sin(angle - Math.PI / 2)
            ),
            new Phaser.Geom.Point(
                endPoint.x + perpendicularWidth * Math.cos(angle + Math.PI / 2),
                endPoint.y + perpendicularWidth * Math.sin(angle + Math.PI / 2)
            ),
            new Phaser.Geom.Point(
                endPoint.x + perpendicularWidth * Math.cos(angle - Math.PI / 2),
                endPoint.y + perpendicularWidth * Math.sin(angle - Math.PI / 2)
            )
        ];
    
        // Создание и возвращение прямоугольника
        return new Phaser.Geom.Polygon(points.map(p => [p.x, p.y]).flat());
    }

}
