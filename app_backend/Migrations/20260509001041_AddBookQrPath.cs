using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace app_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddBookQrPath : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "QrPath",
                table: "Books",
                type: "character varying(260)",
                maxLength: 260,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QrPath",
                table: "Books");
        }
    }
}
