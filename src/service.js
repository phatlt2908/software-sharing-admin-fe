export default {
    getCategoryDisplayInfo(name) {
        switch (name) {
            case "game":
                return {
                    color: "bd-is-game",
                    title: "Game",
                    subtitle: "Tải game miễn phí",
                    icon: "gamepad"
                };

            case "office":
                return {
                    color: "bd-is-office",
                    title: "Phần mềm văn phòng",
                    subtitle: "Tải phần mềm văn phòng, word, excel, powerpoint, PDF miễn phí",
                    icon: "print"
                };

            case "graphic":
                return {
                    color: "bd-is-success",
                    title: "Phần mềm đồ họa",
                    subtitle: "Phần mềm chỉnh sửa ảnh, video miễn phí",
                    icon: "paint-brush"
                };

            case "technique":
                return {
                    color: "bd-is-tech",
                    title: "Phần mềm kỹ thuật",
                    subtitle: "Phần mềm kỹ thuật, xây dựng, dựng 2D, 3D miễn phí",
                    icon: "drafting-compass"
                };

            case "os":
                return {
                    color: "bd-is-link",
                    title: "Hệ điều hành",
                    subtitle: "Tải Win, hướng dẫn cài Win, Ghost Win và nhiều hơn nữa",
                    icon: ['fab', 'windows']
                };

            case "common":
                return {
                    color: "bd-is-black",
                    title: "Ai cũng cần",
                    subtitle: "Tất cả các phần mềm cơ bản mà bất cứ máy tính nào cũng cần đến",
                    icon: "file-archive"
                };

            default:
                break;
        }
    }
}